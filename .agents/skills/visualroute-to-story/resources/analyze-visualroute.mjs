#!/usr/bin/env node
/**
 * Analyze a Percy `*.visualroute.*` file (plus its companion `*.visualspec.*`)
 * and emit a JSON conversion plan for the `visualroute-to-story` skill.
 *
 * This script does the mechanical extraction only. It never writes files and
 * never transforms JSX — shaping the story file is the agent's job, guided by
 * the plan this emits.
 *
 * Usage:
 *   node analyze-visualroute.mjs <visualroute-file> [--pretty]
 *   node analyze-visualroute.mjs --all <glob-root> [--pretty]
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { basename, dirname, join, relative, sep } from 'node:path';

const SPEC_EXTS = ['js', 'ts', 'jsx', 'tsx'];
const ROUTE_RE = /\.visualroute\.(jsx?|tsx?)$/;

// ui-kit's composite routes are a known, closed set of three, each verified by
// hand. Asserting the list
// beats inferring it: label-prefix clustering false-positives on state names
// (Tag's "Normal"/"Warning", ToggleInput's "Default"/"Small") and misses both
// `messages` (one variant per sub-component) and `spacings` (labels built in a
// .map(), so there is no static label to cluster).
//
// There is deliberately no automatic backstop. Counting distinct `<Ns.Sub>`
// elements looks like the right signal but flags every compound component:
// ViewSwitcher.Button nests inside ViewSwitcher.Group and RadioInput.Option
// inside RadioInput.Group, used together as one unit rather than one per <Spec>.
// It fired on exactly those two files and on neither real composite.
//
// Values are the sub-component's existing stories file, relative to the route
// file's own directory, because that is where its story export is appended.
const KNOWN_COMPOSITES = {
  messages: {
    ErrorMessage: 'error-message/error-message.stories.tsx',
    WarningMessage: 'warning-message/warning-message.stories.tsx',
  },
  spacings: {
    Inline: 'spacings-inline/src/inline.stories.tsx',
    Inset: 'spacings-inset/src/inset.stories.tsx',
    InsetSquish: 'spacings-inset-squish/src/inset-squish.stories.tsx',
    Stack: 'spacings-stack/src/stack.stories.tsx',
  },
  text: {
    Headline: 'stories/headline.stories.tsx',
    Subheadline: 'stories/subheadline.stories.tsx',
    Body: 'stories/body.stories.tsx',
    Caption: 'stories/caption.stories.tsx',
    // Deliberately crossed: text/src/stories/detail.stories.tsx holds WrapProxy
    // and is titled Text.Wrap, and wrap.stories.tsx holds DetailProxy titled
    // Text.Detail. The filenames are the odd ones out; keyed to content here.
    Detail: 'stories/wrap.stories.tsx',
    Wrap: 'stories/detail.stories.tsx',
  },
};

// ---------------------------------------------------------------------------
// Lexing helpers
// ---------------------------------------------------------------------------

/**
 * Blank out comments while preserving byte offsets and line numbers, so that
 * structural scans can't be fooled by commented-out JSX. Strings are honored so
 * that `'https://x'` and `'// not a comment'` survive intact. Regex literals are
 * deliberately not modeled — the visual route files contain none, and guessing
 * regex-vs-division is a worse failure mode than ignoring it.
 */
function blankComments(src) {
  const out = src.split('');
  let i = 0;
  const n = src.length;
  let quote = null;

  while (i < n) {
    const c = src[i];
    const next = src[i + 1];

    if (quote) {
      if (c === '\\') {
        i += 2;
        continue;
      }
      if (c === quote) quote = null;
      i += 1;
      continue;
    }

    if (c === '"' || c === "'" || c === '`') {
      quote = c;
      i += 1;
      continue;
    }

    if (c === '/' && next === '/') {
      while (i < n && src[i] !== '\n') {
        out[i] = ' ';
        i += 1;
      }
      continue;
    }

    if (c === '/' && next === '*') {
      const end = src.indexOf('*/', i + 2);
      const stop = end === -1 ? n : end + 2;
      for (let j = i; j < stop; j += 1) {
        if (src[j] !== '\n') out[j] = ' ';
      }
      i = stop;
      continue;
    }

    i += 1;
  }

  return out.join('');
}

const lineAt = (src, index) => src.slice(0, index).split('\n').length;

/** Read a balanced run starting at `start` (which must be the opening char). */
function readBalanced(src, start, open, close) {
  let depth = 0;
  let quote = null;
  for (let i = start; i < src.length; i += 1) {
    const c = src[i];
    if (quote) {
      if (c === '\\') {
        i += 1;
        continue;
      }
      if (c === quote) quote = null;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') {
      quote = c;
      continue;
    }
    if (c === open) depth += 1;
    else if (c === close) {
      depth -= 1;
      if (depth === 0) return { text: src.slice(start, i + 1), end: i + 1 };
    }
  }
  return { text: src.slice(start), end: src.length };
}

/** Escape a value before interpolating it into a `new RegExp` source. */
const escapeRe = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Find every `<TagName ...>` occurrence and return its attribute text. Reads to
 * the matching `>` while tracking braces and strings, so attributes holding JSX
 * or object literals don't terminate the tag early.
 */
function findJsxTags(src, tagName) {
  const results = [];
  const re = new RegExp(`<${escapeRe(tagName)}(?=[\\s/>])`, 'g');
  let m;
  while ((m = re.exec(src)) !== null) {
    const attrStart = m.index + tagName.length + 1;
    let i = attrStart;
    let brace = 0;
    let quote = null;
    while (i < src.length) {
      const c = src[i];
      if (quote) {
        if (c === '\\') i += 1;
        else if (c === quote) quote = null;
      } else if (c === '"' || c === "'" || c === '`') {
        quote = c;
      } else if (c === '{') brace += 1;
      else if (c === '}') brace -= 1;
      else if (c === '>' && brace === 0) break;
      i += 1;
    }
    results.push({
      index: m.index,
      line: lineAt(src, m.index),
      attrs: src.slice(attrStart, i),
      selfClosing: src[i - 1] === '/',
    });
  }
  return results;
}

/** Extract one attribute's value, classifying it as static or dynamic. */
function readAttr(attrs, name) {
  const re = new RegExp(`(^|\\s)${escapeRe(name)}\\s*=\\s*`);
  const m = re.exec(attrs);
  if (!m) return null;
  const start = m.index + m[0].length;
  const c = attrs[start];

  if (c === '"' || c === "'") {
    const end = attrs.indexOf(c, start + 1);
    return { static: true, value: attrs.slice(start + 1, end) };
  }

  if (c === '{') {
    const { text } = readBalanced(attrs, start, '{', '}');
    const inner = text.slice(1, -1).trim();
    const literal = /^(['"])((?:[^\\]|\\.)*?)\1$/.exec(inner);
    if (literal) return { static: true, value: literal[2] };
    const template = /^`([^`$]*)`$/.exec(inner);
    if (template) return { static: true, value: template[1] };
    return { static: false, value: inner };
  }

  return null;
}

// ---------------------------------------------------------------------------
// Naming
// ---------------------------------------------------------------------------

const pascal = (kebab) =>
  kebab
    .split(/[-_.]/)
    .filter(Boolean)
    .map((p) => p[0].toUpperCase() + p.slice(1))
    .join('');

/** `date-input-open` -> ['date-input-open', 'date-input', 'date'] */
function suffixCandidates(base) {
  const parts = base.split('-');
  const out = [];
  for (let keep = parts.length; keep > 0; keep -= 1) {
    out.push(parts.slice(0, keep).join('-'));
  }
  return out;
}

// ---------------------------------------------------------------------------
// Companion spec resolution
// ---------------------------------------------------------------------------

/**
 * Locate the `*.visualspec.*` that snapshots this route. Three strategies, in
 * order of confidence:
 *   1. exact sibling `<base>.visualspec.*`
 *   2. a sibling spec whose `page.goto` references this file's routePath
 *      (covers `date-input-open.visualroute.jsx`, snapshotted by
 *      `date-input.visualspec.js`)
 *   3. `<base-minus-trailing-segments>.visualspec.*`
 */
function findSpecFile(routeFile, base, routePath) {
  const dir = dirname(routeFile);

  for (const ext of SPEC_EXTS) {
    const exact = join(dir, `${base}.visualspec.${ext}`);
    if (existsSync(exact)) return { path: exact, match: 'exact' };
  }

  const siblings = readdirSync(dir).filter((f) => /\.visualspec\.(jsx?|tsx?)$/.test(f));

  if (routePath) {
    for (const f of siblings) {
      const full = join(dir, f);
      const body = readFileSync(full, 'utf8');
      if (body.includes(`${routePath}/`) || body.includes(`${routePath}\``) || body.includes(`${routePath}'`)) {
        return { path: full, match: 'routePath' };
      }
    }
  }

  for (const candidate of suffixCandidates(base).slice(1)) {
    for (const ext of SPEC_EXTS) {
      const guess = join(dir, `${candidate}.visualspec.${ext}`);
      if (existsSync(guess)) return { path: guess, match: 'suffix-stripped' };
    }
  }

  return { path: null, match: 'none' };
}

// ---------------------------------------------------------------------------
// Route file analysis
// ---------------------------------------------------------------------------

const PERCY_HELPER_RE = /(test\/percy|test-utils|\/percy)/;

function analyzeRoute(routeFile) {
  const raw = readFileSync(routeFile, 'utf8');
  const src = blankComments(raw);
  const warnings = [];

  // --- imports -----------------------------------------------------------
  const imports = { keep: [], drop: [] };
  const importRe = /import\s+([\s\S]*?)\s+from\s+(['"])(.*?)\2;?/g;
  let im;
  while ((im = importRe.exec(src)) !== null) {
    const clause = im[1].trim();
    const source = im[3];
    const names = clause
      .replace(/[{}]/g, ' ')
      .split(',')
      .map((s) => s.trim().split(/\s+as\s+/).pop().trim())
      .filter((s) => s && s !== 'type');
    const entry = { source, clause, names, line: lineAt(src, im.index) };
    // Percy scaffolding and prop-types go; everything else is load-bearing.
    if (PERCY_HELPER_RE.test(source) || source === 'prop-types') imports.drop.push(entry);
    else imports.keep.push(entry);
  }

  const importedIdents = imports.keep.flatMap((i) => i.names);
  const droppedIdents = imports.drop.flatMap((i) => i.names);

  // --- routePath ---------------------------------------------------------
  const routePathMatch = /export\s+const\s+routePath\s*=\s*(['"`])(.*?)\1/.exec(src);
  const routePath = routePathMatch ? routePathMatch[2] : null;
  if (!routePath) warnings.push('No `export const routePath` found — confirm this is a visual route file.');

  // --- exported render entry point --------------------------------------
  const exportShape = /export\s+const\s+Component\s*=/.test(src)
    ? 'Component'
    : /export\s+const\s+component\s*=/.test(src)
      ? 'component'
      : null;
  if (!exportShape) warnings.push('No exported `component`/`Component` render function found.');

  // --- wrappers ----------------------------------------------------------
  const wrappers = {
    suite: /<Suite[\s/>]/.test(src),
    nestedPages: /<NestedPages[\s/>]/.test(src),
    routerSwitch: /<Switch[\s/>]/.test(src),
    localThemeProviders: [...new Set((src.match(/<(Local\w*ThemeProvider)[\s/>]/g) || []).map((s) => s.replace(/[<\s/>]/g, '')))],
  };

  // --- <Spec> variants ---------------------------------------------------
  // `size`, `contentAlignment`, `tone` and `backgroundColor` change the frame
  // the variant is captured in (min-height, flex centering + `position:
  // relative`, backdrop color), so they must survive onto VisualSpec.
  // `propsToList`/`omitPropsList` only tuned Percy's props read-out, which is
  // dropped, so they are recorded but not carried over.
  const LAYOUT_ATTRS = ['size', 'contentAlignment', 'tone', 'backgroundColor'];
  const variants = findJsxTags(src, 'Spec').map((tag) => {
    const label = readAttr(tag.attrs, 'label');
    const layout = {};
    for (const attr of LAYOUT_ATTRS) {
      const value = readAttr(tag.attrs, attr);
      if (value) layout[attr] = value.static ? value.value : `{${value.value}}`;
    }
    return {
      line: tag.line,
      label: label ? label.value : null,
      labelIsDynamic: label ? !label.static : false,
      carryOver: layout,
      droppedPropsListConfig: ['propsToList', 'omitPropsList', 'listPropsOfNestedChild'].filter((a) =>
        readAttr(tag.attrs, a)
      ),
    };
  });

  const withLayout = variants.filter((v) => Object.keys(v.carryOver).length > 0);
  if (withLayout.length > 0) {
    warnings.push(
      `${withLayout.length} <Spec> element(s) set frame-affecting props (${[
        ...new Set(withLayout.flatMap((v) => Object.keys(v.carryOver))),
      ].join(', ')}). Carry these onto <VisualSpec> — dropping contentAlignment="center" removes the "position: relative" that scoped dialog portals anchor to.`
    );
  }

  const dynamicLabels = variants.filter((v) => v.labelIsDynamic).length;
  if (dynamicLabels > 0) {
    warnings.push(
      `${dynamicLabels} of ${variants.length} <Spec> labels are computed (rendered inside .map()). Keep the surrounding loop verbatim; do not inline the variants.`
    );
  }

  // --- react-router sub-routes ------------------------------------------
  // Paths are template expressions (`` `${routePath}/open` ``) or the bare
  // `routePath` identifier, so resolve them against the known routePath before
  // anything downstream tries to name a story from one.
  const resolvePath = (attr) => {
    if (!attr) return { path: null, dynamic: false };
    if (attr.static) return { path: attr.value, dynamic: false };
    const expr = attr.value.trim();
    if (expr === 'routePath') return { path: routePath, dynamic: false };
    const tmpl = /^`([\s\S]*)`$/.exec(expr);
    if (tmpl) {
      const resolved = tmpl[1].replace(/\$\{\s*routePath\s*\}/g, routePath ?? '');
      // Any surviving `${...}` is a loop variable we cannot evaluate statically.
      return { path: resolved, dynamic: /\$\{/.test(resolved) };
    }
    return { path: expr, dynamic: true };
  };

  const subRoutes = findJsxTags(src, 'Route')
    .map((tag) => {
      const resolved = resolvePath(readAttr(tag.attrs, 'path'));
      const comp = readAttr(tag.attrs, 'component');
      const render = readAttr(tag.attrs, 'render');
      const renderExpr = comp ? comp.value : render ? render.value : null;
      // `render={() => <DefaultRoute />}` — recover the component identifier.
      const identMatch = renderExpr && /<\s*([A-Z]\w*)/.exec(renderExpr);
      return {
        line: tag.line,
        path: resolved.path,
        pathIsDynamic: resolved.dynamic,
        isBase: resolved.path === routePath,
        rendersIdent: identMatch ? identMatch[1] : /^[A-Z]\w*$/.test(renderExpr ?? '') ? renderExpr : null,
      };
    })
    .filter((r) => r.path !== null);

  // Under NestedPages the <Route>s belong to a page's inner content (tab
  // panels), not to top-level variants, so an unresolved path there is expected.
  const dynamicRoutes = wrappers.nestedPages ? [] : subRoutes.filter((r) => r.pathIsDynamic);
  if (dynamicRoutes.length > 0) {
    warnings.push(
      `${dynamicRoutes.length} <Route path> value(s) interpolate a loop variable and could not be resolved statically (${dynamicRoutes.map((r) => r.path).join(', ')}). Read the visualspec to enumerate the real paths.`
    );
  }

  // --- app-kit NestedPages ---------------------------------------------
  const nestedPages = [];
  const pagesAttrIdx = src.indexOf('pages=');
  if (pagesAttrIdx !== -1) {
    const braceIdx = src.indexOf('{', pagesAttrIdx);
    const arr = readBalanced(src, src.indexOf('[', braceIdx), '[', ']');
    // Walk only the array's top-level object literals so a `path:` nested in a
    // `spec:` JSX tree can't be mistaken for a page entry.
    let i = 1;
    while (i < arr.text.length) {
      if (arr.text[i] === '{') {
        const obj = readBalanced(arr.text, i, '{', '}');
        const pm = /(^|[\s,{])path\s*:\s*(['"`])(.*?)\2/.exec(obj.text);
        const nm = /(^|[\s,{])name\s*:\s*(['"`])(.*?)\2/.exec(obj.text);
        if (pm) {
          nestedPages.push({
            path: pm[3],
            name: nm ? nm[3] : null,
            line: lineAt(src, src.indexOf('[', braceIdx) + i),
          });
        }
        i = obj.end;
        continue;
      }
      i += 1;
    }
  }

  // --- component naming -------------------------------------------------
  const base = basename(routeFile).replace(ROUTE_RE, '');
  const parentDir = basename(dirname(routeFile)) === 'src' ? basename(dirname(dirname(routeFile))) : basename(dirname(routeFile));

  const nameCandidates = [...new Set([pascal(base), pascal(parentDir), ...suffixCandidates(base).map(pascal)])];
  // Case-insensitive: `icons.visualroute.jsx` imports the namespace as `icons`.
  const lowerIdents = new Set(importedIdents.map((i) => i.toLowerCase()));
  const matched = nameCandidates.filter((c) => lowerIdents.has(c.toLowerCase()));
  const componentName = matched[0] || pascal(base);
  if (matched.length === 0) {
    warnings.push(
      `No imported identifier matches a name derived from the path. Falling back to "${componentName}"; candidates were ${nameCandidates.join(', ')} and imports are ${importedIdents.join(', ') || '(none)'}.`
    );
  }

  // Is this a variant route of a sibling component (e.g. `*-open`)?
  let variantOf = null;
  for (const candidate of suffixCandidates(base).slice(1)) {
    const sibling = readdirSync(dirname(routeFile)).find((f) => f.replace(ROUTE_RE, '') === candidate && ROUTE_RE.test(f));
    if (sibling) {
      variantOf = { base: candidate, componentName: pascal(candidate), file: sibling };
      break;
    }
  }

  return {
    raw,
    src,
    base,
    componentName,
    nameCandidates,
    nameConfidence: matched.length > 0 ? 'matched-import' : 'filename-fallback',
    variantOf,
    routePath,
    exportShape,
    language: routeFile.endsWith('x') && routeFile.includes('.tsx') ? 'tsx' : 'jsx',
    imports,
    droppedIdents,
    wrappers,
    variants,
    subRoutes,
    nestedPages,
    warnings,
  };
}

// ---------------------------------------------------------------------------
// Spec file analysis
// ---------------------------------------------------------------------------

function analyzeSpec(specFile) {
  if (!specFile) return null;
  const raw = readFileSync(specFile, 'utf8');
  const src = blankComments(raw);

  // Specs sometimes wrap Percy in a local helper to pin options, e.g.
  // `const snapshot = (page, d) => percySnapshot(page, d, { widths: [1600] })`.
  // Matching only `percySnapshot(` would miss every call through the alias.
  const aliases = new Set(['percySnapshot']);
  for (const m of src.matchAll(/(?:const|let|var|function)\s+(\w+)\s*=?[^=;]*=>?[\s\S]{0,120}?percySnapshot\s*\(/g)) {
    aliases.add(m[1]);
  }

  // Live snapshots come from the comment-blanked source; commented-out ones fall
  // out of the difference against raw text; they feed the triage list.
  const collect = (text) => {
    const out = [];
    const names = [...aliases].map(escapeRe).join('|');
    const re = new RegExp(`\\b(?:${names})\\s*\\(\\s*[^,)]+,\\s*(['"\`])([\\s\\S]*?)\\1`, 'g');
    let m;
    while ((m = re.exec(text)) !== null) {
      // A call site inside `.map()`/`forEach` emits one snapshot per iteration.
      const preceding = text.slice(Math.max(0, m.index - 400), m.index);
      const looped = /\.(map|forEach)\s*\(/.test(preceding) && /\$\{/.test(m[2]);
      out.push({ name: m[2], line: lineAt(text, m.index), looped });
    }
    return out;
  };
  const live = collect(src);
  const all = collect(raw);
  const liveNames = new Set(live.map((s) => `${s.name}`));
  const commentedOut = all.filter((s) => !liveNames.has(s.name));

  // Explicit Percy viewport overrides -> chromatic.viewports
  const viewportWidths = [
    ...new Set(
      [...src.matchAll(/widths\s*:\s*\[([^\]]*)\]/g)].flatMap((m) =>
        m[1].split(',').map((s) => Number(s.trim())).filter((n) => Number.isFinite(n))
      )
    ),
  ];

  // Interaction primitives that must become play-function steps.
  const interactions = [];
  const push = (kind, target, index, extra) =>
    interactions.push({ kind, target, index, line: lineAt(src, index), ...extra });

  for (const m of src.matchAll(/page\.click\(\s*(['"`])(.*?)\1/g)) push('click', m[2], m.index);
  for (const m of src.matchAll(/page\.type\(\s*(['"`])(.*?)\1\s*,\s*(['"`])(.*?)\3/g))
    push('type', m[2], m.index, { text: m[4] });
  for (const m of src.matchAll(/page\.hover\(\s*(['"`])(.*?)\1/g)) push('hover', m[2], m.index);
  for (const m of src.matchAll(/page\.focus\(\s*(['"`])(.*?)\1/g)) push('focus', m[2], m.index);
  for (const m of src.matchAll(/\.press\(\s*(['"`])(.*?)\1/g)) push('press', m[2], m.index);
  for (const m of src.matchAll(/(\w+)\.type\(\s*(['"`])(.*?)\2/g)) {
    if (m[1] !== 'page') push('type', m[1], m.index, { text: m[3], viaHandle: true });
  }
  for (const m of src.matchAll(/queries\.(find|get)By(\w+)\(\s*\w+\s*,\s*(['"`])(.*?)\3/g))
    push('query', m[4], m.index, { by: m[2] });
  for (const m of src.matchAll(/page\.waitForSelector\(\s*(['"`])(.*?)\1/g))
    push('waitFor', m[2], m.index, { isTextSelector: m[2].startsWith('text/') });
  for (const m of src.matchAll(/\.click\(\)/g)) {
    const before = src.slice(Math.max(0, m.index - 80), m.index);
    const handle = /(\w+)\s*$/.exec(before);
    if (handle) push('click', handle[1], m.index, { viaHandle: true });
  }

  // `describe.each` tagged-template rows -> one story export per row.
  const parameterizedPaths = [];
  const eachIdx = src.indexOf('describe.each');
  if (eachIdx !== -1) {
    const tickStart = src.indexOf('`', eachIdx);
    const tickEnd = src.indexOf('`', tickStart + 1);
    if (tickStart !== -1 && tickEnd !== -1) {
      for (const m of src.slice(tickStart, tickEnd).matchAll(/\$\{\s*(['"`])(.*?)\1\s*\}/g)) {
        parameterizedPaths.push(m[2]);
      }
    }
  }

  // Split the spec into per-route segments. Each `page.goto` opens a segment;
  // everything up to the next `goto` describes what happens on that route. This
  // is what lets a story know whether *it* needs a play function, instead of
  // inheriting "the file is interactive somewhere".
  const gotos = [...src.matchAll(/page\.goto\(\s*[`'"]([^`'"]*)[`'"]/g)].map((m) => ({
    index: m.index,
    // `${globalThis.HOST}/select-input/open` -> `/select-input/open`
    route: m[1].replace(/\$\{[^}]*\}/g, ''),
  }));

  const segments = gotos.map((g, i) => {
    const end = i + 1 < gotos.length ? gotos[i + 1].index : src.length;
    const within = (item) => item.index > g.index && item.index < end;
    const segInteractions = interactions.filter(within);
    return {
      route: g.route,
      line: lineAt(src, g.index),
      interactions: segInteractions.map(({ index, ...rest }) => rest),
      snapshots: live.filter((s) => s.line > lineAt(src, g.index) && s.line < lineAt(src, end)).map((s) => s.name),
      commentedOutSnapshots: commentedOut
        .filter((s) => s.line > lineAt(src, g.index) && s.line < lineAt(src, end))
        .map((s) => s.name),
      isInteractive: segInteractions.some((i) => ['click', 'type', 'press', 'hover', 'focus'].includes(i.kind)),
    };
  });

  return {
    path: specFile,
    snapshots: live,
    commentedOutSnapshots: commentedOut,
    viewportWidths,
    interactions: interactions.map(({ index, ...rest }) => rest),
    segments,
    parameterizedPaths,
    visitedRoutes: [...new Set(gotos.map((g) => g.route))],
    isInteractive: interactions.some((i) => ['click', 'type', 'press', 'hover', 'focus'].includes(i.kind)),
  };
}

// ---------------------------------------------------------------------------
// Story plan
// ---------------------------------------------------------------------------

function buildStoryPlan(route, spec) {
  const stories = [];
  const widths = spec?.viewportWidths ?? [];

  const chromaticFor = (extra = {}) => {
    const c = { ...extra };
    if (widths.length) c.viewports = widths;
    return Object.keys(c).length ? c : null;
  };

  const storyName = (raw, fallback) =>
    pascal(String(raw ?? '').replace(/^\//, '').replace(/[^a-zA-Z0-9-_]/g, '-')) || fallback;

  /**
   * The spec segment that visits this exact route. Matching must be exact
   * (modulo a trailing slash): a prefix match would attribute `/icons/${color}`
   * interactions to the bare `/icons` story, which the spec never visits.
   */
  const norm = (p) => (p ?? '').replace(/\/+$/, '');
  const segmentFor = (routePath, parameterizedKey) => {
    const exact = spec?.segments?.find((s) => norm(s.route) === norm(routePath));
    if (exact) return exact;
    // `describe.each` visits one interpolated URL for every row, so the goto
    // resolves to the shared prefix. When this route is one of the enumerated
    // rows, that single segment describes it.
    if (parameterizedKey && spec?.parameterizedPaths?.includes(parameterizedKey)) {
      return spec.segments?.[0] ?? null;
    }
    return null;
  };

  const addStory = (name, source, renders, seg, extraChromatic, note) => {
    stories.push({
      export: name,
      source,
      renders,
      // Driven by what the spec does on *this* route, not by the file overall.
      needsPlay: seg ? seg.isInteractive : false,
      playSteps: seg ? seg.interactions.filter((i) => i.kind !== 'query') : [],
      percySnapshotNames: seg ? seg.snapshots : [],
      hasNoLiveBaseline: Boolean(seg && seg.snapshots.length === 0 && seg.commentedOutSnapshots.length > 0),
      chromatic: chromaticFor(extraChromatic),
      note,
    });
  };

  if (route.nestedPages.length > 0) {
    // app-kit: one story per NestedPages entry. A single stacked AllVariants
    // cannot apply here — each entry is a full-viewport modal page or drawer
    // with a backdrop, so two of them can't share a frame.
    for (const page of route.nestedPages) {
      const seg = segmentFor(`${route.routePath}/${page.path}`, page.path);
      addStory(
        // Entry paths repeat the component name (`drawer-small` under `/drawer`).
        storyName(page.path.replace(new RegExp(`^${escapeRe(route.base)}-?`), ''), storyName(page.path, 'Page')),
        { kind: 'nestedPage', path: page.path, line: page.line },
        'the `spec` JSX for this entry, lifted out of the NestedPages array',
        seg,
        { delay: 500 },
        'Full-viewport overlay: use layout "fullscreen" and let the entrance animation settle.'
      );
    }
  } else if (route.subRoutes.length > 1) {
    // ui-kit: react-router sub-routes. The bare routePath renders the variants
    // stack; each deeper path is a distinct state the spec navigates to.
    for (const r of route.subRoutes) {
      const suffix = (r.path ?? '').replace(route.routePath ?? '', '');
      addStory(
        r.isBase ? 'AllVariants' : storyName(suffix, 'Variant'),
        { kind: 'subRoute', path: r.path, pathIsDynamic: r.pathIsDynamic, rendersIdent: r.rendersIdent, line: r.line },
        r.rendersIdent ? `the existing \`${r.rendersIdent}\` body, verbatim` : 'the sub-route body',
        segmentFor(r.path),
        {},
        r.pathIsDynamic
          ? 'Path interpolates a loop variable — enumerate the real values from the visualspec and emit one story per value.'
          : null
      );
    }
  } else {
    // A `*-open`-style secondary route belongs in the primary component's file,
    // so it must not also claim the `AllVariants` name.
    const isSecondary = Boolean(route.variantOf);
    const suffix = isSecondary ? route.base.slice(route.variantOf.base.length) : '';
    addStory(
      isSecondary ? storyName(suffix, 'Variant') : 'AllVariants',
      { kind: 'flat', variantCount: route.variants.length },
      'every <Spec> child, in source order, inside <VisualSpec label=...>',
      segmentFor(route.routePath),
      {},
      isSecondary
        ? `Append this export to ${route.variantOf.base}.stories.tsx; do not create a second file.`
        : null
    );
  }

  // AllVariants is the primary export and reads first in the file, but the
  // <Route> elements that produce it are usually declared last (react-router
  // matches most-specific first).
  return stories.sort((a, b) => Number(b.export === 'AllVariants') - Number(a.export === 'AllVariants'));
}

function manualReview(route, spec) {
  const items = [];

  if (spec?.commentedOutSnapshots.length) {
    items.push({
      kind: 'commented-out-percy-snapshot',
      detail: `${spec.commentedOutSnapshots.length} snapshot call(s) are commented out in ${basename(spec.path)} (${spec.commentedOutSnapshots.map((s) => s.name).join(', ')}). These states have no Percy baseline today. Generate the story, but flag it — enabling them is a coverage increase, not parity.`,
    });
  }
  if (!spec) {
    items.push({
      kind: 'no-companion-spec',
      detail: 'No visualspec found, so no snapshot names, viewports, or interactions could be read. The route may be dead code — check before converting.',
    });
  }
  const looped = spec?.snapshots.filter((s) => s.looped) ?? [];
  if (looped.length) {
    items.push({
      kind: 'looped-snapshot',
      detail: `${looped.length} snapshot call site(s) sit inside a .map()/forEach and emit one snapshot per iteration (${looped.map((s) => s.name).join(', ')}). The static count understates real Percy coverage — enumerate the loop's values and emit one story per value.`,
    });
  }
  if (spec?.isInteractive) {
    items.push({
      kind: 'interactive-play-function',
      detail: 'Scaffolded play steps come from puppeteer calls and need review against the original spec: selector semantics, ordering, and what state the last step leaves on screen.',
    });
  }
  if (/getParentSelector|parentSelector/.test(route.src)) {
    items.push({
      kind: 'scoped-portal',
      detail: 'Renders an overlay into a scoped portal target (getParentSelector/parentSelector pointing at an inline div). That is what lets several overlays stack in one frame — keep the portal div, its id, and the selector callback verbatim.',
    });
  }
  if (route.wrappers.localThemeProviders.length) {
    items.push({
      kind: 'theme-providers',
      detail: `Renders ${route.wrappers.localThemeProviders.join(
        ', '
      )}. Local theme scoping is what this route tests, so keep the providers inline in the story body rather than delegating to a global decorator, and do not reach for chromatic.modes (modes vary global settings; this route needs several themed scopes in one DOM). Blocker: these helpers are imported from test/percy/, which the Percy teardown deletes. Relocate them out of test/percy/ before that teardown or this story breaks.`,
    });
  }
  if (route.variants.some((v) => v.labelIsDynamic)) {
    items.push({
      kind: 'generated-variants',
      detail: 'Some <Spec> elements are produced by .map(). Keep the loop; replace only the <Spec> tag itself.',
    });
  }
  if (route.variantOf) {
    items.push({
      kind: 'variant-route',
      detail: `This looks like a secondary route for ${route.variantOf.componentName} (sibling: ${route.variantOf.file}). Append it as an extra story export to that component's stories file rather than creating a separate file.`,
    });
  }

  const compositeMap = KNOWN_COMPOSITES[route.base] ?? null;

  if (compositeMap) {
    const names = Object.keys(compositeMap);
    items.push({
      kind: 'composite-route',
      detail: `Composite route covering ${names.length} sub-components (${names.join(', ')}). Split per sub-component and append each story export to that sub-component's existing stories file, listed in compositeTargets. Group the <Spec> entries by which sub-component they render.`,
      subComponents: names,
    });
  }

  return items;
}

/**
 * Where the generated story export lands. Stories are appended to the
 * component's existing `*.stories.tsx` so they sit beside its demo stories, per
 * which also removes the glob hazard: the target file is already discovered by
 * Storybook.
 */
function readTitle(file) {
  if (!existsSync(file)) return null;
  const m = /\btitle:\s*['"]([^'"]+)['"]/.exec(readFileSync(file, 'utf8'));
  return m ? m[1] : null;
}

function resolveTarget(routeFile, route) {
  // A `*-open` secondary route appends to its primary component's file.
  const base = route.variantOf ? route.variantOf.base : route.base;
  const file = join(dirname(routeFile), `${base}.stories.tsx`);
  const exists = existsSync(file);
  return {
    file,
    exists,
    action: exists ? 'append' : 'create',
    title: readTitle(file),
  };
}

function resolveCompositeTargets(routeFile, route) {
  const map = KNOWN_COMPOSITES[route.base];
  if (!map) return null;

  return Object.entries(map).map(([subComponent, rel]) => {
    const file = join(dirname(routeFile), rel);
    const exists = existsSync(file);
    return {
      subComponent,
      file,
      exists,
      action: exists ? 'append' : 'create',
      title: readTitle(file),
    };
  });
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

function analyze(routeFile) {
  const route = analyzeRoute(routeFile);
  const found = findSpecFile(routeFile, route.base, route.routePath);
  const spec = analyzeSpec(found.path);

  const target = resolveTarget(routeFile, route);
  const compositeTargets = resolveCompositeTargets(routeFile, route);

  return {
    input: {
      routeFile,
      specFile: found.path,
      specMatch: found.match,
      language: route.language,
    },
    component: {
      name: route.componentName,
      nameCandidates: route.nameCandidates,
      nameConfidence: route.nameConfidence,
      variantOf: route.variantOf,
      // Stories inherit the target file's existing title; there is no dedicated
      // `Visual Regression/*` group.
      target: compositeTargets ? null : target,
      compositeTargets,
    },
    routePath: route.routePath,
    exportShape: route.exportShape,
    imports: {
      keep: route.imports.keep.map(({ source, clause, line }) => ({ source, clause, line })),
      drop: route.imports.drop.map(({ source, clause, line }) => ({ source, clause, line })),
    },
    wrappers: route.wrappers,
    variants: route.variants,
    subRoutes: route.subRoutes,
    nestedPages: route.nestedPages,
    percy: spec
      ? {
          snapshots: spec.snapshots,
          commentedOutSnapshots: spec.commentedOutSnapshots,
          viewportWidths: spec.viewportWidths,
          interactions: spec.interactions,
          parameterizedPaths: spec.parameterizedPaths,
          visitedRoutes: spec.visitedRoutes,
          isInteractive: spec.isInteractive,
        }
      : null,
    storyPlan: buildStoryPlan(route, spec),
    warnings: route.warnings,
    manualReview: [
      ...manualReview(route, spec),
      ...(compositeTargets ?? [target])
        .filter((t) => t && !t.exists)
        .map((t) => ({
          kind: 'no-target-stories-file',
          detail: `No stories file at ${t.file}, so there is nothing to append to. Create it at the conventional path, matching the title scheme of neighbouring components. Two ui-kit routes need this: content-notification, and icons' 9-color group (its inline-svg / leading-icon / custom-icon snapshots append to those sub-directories' own stories files instead).`,
        })),
    ],
  };
}

function walk(root) {
  const out = [];
  const visit = (dir) => {
    for (const entry of readdirSync(dir)) {
      if (entry === 'node_modules' || entry === '.git' || entry === 'dist') continue;
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) visit(full);
      else if (ROUTE_RE.test(entry)) out.push(full);
    }
  };
  visit(root);
  return out.sort();
}

const argv = process.argv.slice(2);
const pretty = argv.includes('--pretty');
const positional = argv.filter((a) => !a.startsWith('--'));

if (positional.length === 0) {
  console.error('Usage: node analyze-visualroute.mjs <visualroute-file> [--pretty]');
  console.error('       node analyze-visualroute.mjs --all <root> [--pretty]');
  process.exit(1);
}

let result;
if (argv.includes('--all')) {
  const files = walk(positional[0]);
  result = {
    root: positional[0],
    total: files.length,
    plans: files.map((f) => {
      try {
        return analyze(f);
      } catch (error) {
        return { input: { routeFile: f }, error: error.message };
      }
    }),
  };
} else {
  const file = positional[0];
  if (!existsSync(file)) {
    console.error(`Not found: ${file}`);
    process.exit(1);
  }
  result = analyze(file);
}

console.log(JSON.stringify(result, null, pretty ? 2 : 0));
