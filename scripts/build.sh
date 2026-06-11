#!/usr/bin/env bash

set -e

pnpm generate-icons
pnpm design-tokens:build
pnpm compile-intl

# --- declaration-emit leak workaround (FEC-938) ---
# `@commercetools-frontend/ui-kit` (the aggregate preset) is a root
# devDependency because the .visualroute/bundlespec fixtures import it. Under
# strict pnpm that puts a `node_modules/@commercetools-frontend/ui-kit` symlink
# in place, and preconstruct's declaration emit then prefers that resolvable
# bare specifier over the in-package relative path — leaking
# `import("@commercetools-frontend/ui-kit").T...Props` into the published .d.ts
# of the compound components (constraints, radio-input, view-switcher). Strict
# consumers can't resolve it, so those prop types collapse to `any`.
#
# preconstruct does not need that symlink (the fixtures aren't part of the dts
# program), so we hide it during the build to force the correct relative
# specifier, and restore it afterwards (and on any exit).
META_SYMLINK="node_modules/@commercetools-frontend/ui-kit"
META_SYMLINK_TARGET=""
restore_meta_symlink() {
  if [ -n "$META_SYMLINK_TARGET" ] && [ ! -e "$META_SYMLINK" ]; then
    ln -s "$META_SYMLINK_TARGET" "$META_SYMLINK"
  fi
}
if [ -L "$META_SYMLINK" ]; then
  META_SYMLINK_TARGET="$(readlink "$META_SYMLINK")"
  trap restore_meta_symlink EXIT
  rm "$META_SYMLINK"
fi

pnpm preconstruct build

restore_meta_symlink
trap - EXIT

# Regression guard: assert the leak stays gone. No granular package's emitted
# declarations should reference the aggregate `@commercetools-frontend/ui-kit`
# preset by its bare specifier — strict consumers can't resolve it (see above).
# Catches a future reintroduction (workaround dropped, preconstruct resolution
# change, a new compound component). Excludes the preset's own dist.
leaks="$(find packages -type d -name declarations -path '*/dist/*' -prune -exec grep -rl 'import("@commercetools-frontend/ui-kit")' {} + 2>/dev/null || true)"
if [ -n "$leaks" ]; then
  echo "ERROR: published declarations leak the @commercetools-frontend/ui-kit aggregate preset:" >&2
  echo "$leaks" | sed 's/^/  - /' >&2
  echo "See the FEC-938 declaration-emit workaround above in scripts/build.sh." >&2
  exit 1
fi
# --- end workaround ---

pnpm --filter @commercetools-frontend/ui-kit run copy-assets
