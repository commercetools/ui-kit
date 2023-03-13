const fs = require('fs');
const path = require('path');
const yaml = require('yaml');
const camelCase = require('lodash/camelCase');
const kebabCase = require('lodash/kebabCase');
const prettier = require('prettier');
const rcfile = require('rcfile');

const prettierConfig = rcfile('prettier');

const definitions = yaml.parse(
  fs.readFileSync(
    path.join(__dirname, '../materials/internals/definition.yaml'),
    'utf8'
  )
);

const endProgram = (message) => {
  // eslint-disable-next-line no-console
  console.error(`Custom Properties Error: ${message}`);
  process.exit(1);
};

const ALLOWED_KEYWORDS_VALUES_IN_CHOICES =
  /px|none|inherit|hsl|var|unset|center|(#[A-Za-z0-9]{6})/;

const isAllowedCssChoice = (choice) =>
  choice.match(ALLOWED_KEYWORDS_VALUES_IN_CHOICES) !== null;

const supportedStates = Object.keys(definitions.states);
const supportedComponentGroups = Object.keys(definitions.componentGroups);
const supportedVariants = Object.keys(definitions.variants || {});

const designTokens = {};

const combineTokenParts = (currentPart, newPart) =>
  `${currentPart}${currentPart.length > 0 ? '-' : ''}${newPart}`;

/*
  Allowed patterns with examples:
    - <attribute>-for-<component-group>
      + background-color-for-tag
    - <attribute>-for-<component-group>-when-<state>-
      + background-color-for-button-when-disabled
    - <attribute>-for-<component-group>-as-<variant>-
      + border-radius-for-button-as-big
    - <attribute>-for-<component-group>-as-<variant>-when-<state>
    + border-for-button-as-secondary-when-hovered
    - <attribute>-for-<component-group>-as-<variant>-as-<variant>-
    + border-radius-for-button-as-icon-as-small
    - <attribute>-for-<component-group>-as-<variant>-as-<variant>-when-<state>-
      + border-radius-for-button-as-icon-as-small-when-disabled
*/
function parseToken(token) {
  const parts = token.split('-');
  let partType = 'cssProperty';
  let newVariant = false;
  return parts.reduce(
    (tokenParts, part) => {
      if (['for', 'as', 'when'].includes(part)) {
        partType = part;
        if (part === 'as') newVariant = true;
        return tokenParts;
      }

      if (partType === 'for') {
        tokenParts.componentGroup = combineTokenParts(
          tokenParts.componentGroup,
          part
        );
      } else if (partType === 'when') {
        tokenParts.state = combineTokenParts(tokenParts.state, part);
      } else if (partType === 'as') {
        if (newVariant) {
          tokenParts.variants.push(part);
          newVariant = false;
        } else {
          const lastIndex = tokenParts.variants.length - 1;
          tokenParts.variants[
            lastIndex
          ] = `${tokenParts.variants[lastIndex]}-${part}`;
        }
      } else {
        tokenParts.cssProperty = combineTokenParts(
          tokenParts.cssProperty,
          part
        );
      }

      return tokenParts;
    },
    {
      cssProperty: '',
      componentGroup: '',
      variants: [],
      state: '',
    }
  );
}

/*
  We make sure the order of the token parts is
    1. component group
    2. variants (might have several of this)
    3. state

  Eg: <attribute>-for-<component-group>-as-<variant>-when-<state>
*/
function isValidTokenName(tokenName, tokenParts) {
  const componentGroupIndex = tokenName.indexOf(tokenParts.componentGroup);
  const variantsIndexes = tokenParts.variants.map((variant) =>
    tokenName.indexOf(variant)
  );
  const stateIndex = tokenName.indexOf(tokenParts.state) || Number.MAX_VALUE;

  return (
    (variantsIndexes.length === 0 ||
      variantsIndexes.every(
        (variantIndex) => variantIndex > componentGroupIndex
      )) &&
    componentGroupIndex < stateIndex &&
    (variantsIndexes.length === 0 ||
      variantsIndexes.every((variantIndex) => variantIndex < stateIndex))
  );
}

Object.keys(definitions.choiceGroupsByTheme).forEach((themeName) => {
  if (!designTokens[themeName]) {
    designTokens[themeName] = {};
  }

  Object.values(definitions.choiceGroupsByTheme[themeName]).forEach(
    (themeChoiceGroup) => {
      Object.entries(themeChoiceGroup.choices).forEach(([key, value]) => {
        if (designTokens[themeName][key])
          endProgram(`Token "${key} already exists!"`);

        if (key !== key.toLowerCase())
          endProgram(`Tokens "${key}" must be lower case`);

        if (!key.startsWith(themeChoiceGroup.prefix))
          endProgram(
            `Expected token "${key}" to start with "${themeChoiceGroup.prefix}" as it is an "${themeChoiceGroup.label}" attribute.`
          );
        designTokens[themeName][key] = value;
      });
    }
  );
});

// Copy the semantic design tokens
Object.entries(definitions.decisionGroupsByTheme).forEach(
  ([themeName, decisionGroups]) => {
    Object.values(decisionGroups).forEach((decisionGroup) => {
      Object.entries(decisionGroup.decisions).forEach(([key, decision]) => {
        if (designTokens[themeName][key])
          endProgram(`Token "${key} already exists!"`);
        if (key !== key.toLowerCase())
          endProgram(`Tokens "${key}" must be lower case`);
        if (!decision.choice) {
          endProgram(`You forgot to specify a choice for ${decision}`);
        }
        if (
          !designTokens[themeName][decision.choice] &&
          !designTokens.default[decision.choice] &&
          !isAllowedCssChoice(decision.choice)
        ) {
          endProgram(`Choice called "${decision.choice}" was not found!`);
        }

        const tokenParts = parseToken(key);

        if (
          tokenParts.componentGroup &&
          !supportedComponentGroups.includes(tokenParts.componentGroup)
        )
          endProgram(
            `Token "${key}" uses unsupported component group "${tokenParts.componentGroup}"!`
          );

        if (tokenParts.state && !supportedStates.includes(tokenParts.state))
          endProgram(
            `Token "${key}" uses unsupported state "${tokenParts.state}"!`
          );

        const invalidVariants = tokenParts.variants.find(
          (variant) => !supportedVariants.includes(variant)
        );
        if (invalidVariants?.length > 0)
          endProgram(
            `Token "${key}" uses unsupported variants "${invalidVariants}"!`
          );

        if (
          tokenParts.componentGroup &&
          !decision.deprecated &&
          !isValidTokenName(key, tokenParts)
        ) {
          endProgram(
            `Token "${key}" does not follow <attribute>-for-<component-group>-as-<variant>-when-<state> naming scheme! Tokens not following this scheme must use "deprecated" flag.`
          );
        }

        if (!designTokens[themeName]) {
          designTokens[themeName] = {};
        }

        designTokens[themeName][key] = isAllowedCssChoice(decision.choice)
          ? decision.choice
          : designTokens[themeName][decision.choice] ||
            designTokens.default[decision.choice];
      });
    });
  }
);

// Copy over plain tokens (only needed in default theme)
Object.entries(definitions.plainTokens).forEach(([key, value]) => {
  if (designTokens.default[key])
    endProgram(`Token called "${key} already exists!"`);

  designTokens.default[key] = value;
});

// Write files
const printJson = (data) =>
  JSON.stringify(
    Object.entries(data.default).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [`--${key}`]: value,
      }),
      {}
    )
  );

const printDesignTokens = (data) => {
  const themes = Object.fromEntries(
    Object.entries(data).map(([themeKey, themeValues]) => {
      return [
        camelCase(themeKey),
        Object.fromEntries(
          Object.entries(themeValues).map(([key, value]) => [
            camelCase(key),
            value,
          ])
        ),
      ];
    })
  );

  const variables = Object.fromEntries(
    Object.entries(themes.default).map(([key, value]) => [
      key,
      `var(--${kebabCase(key)}, ${value})`,
    ])
  );
  return `
/*
  THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
  This file is created by the 'scripts/generate-design-tokens.js' script.
  The variables should be updated in 'materials/internals/definition.yaml'.
*/
export const themes = ${JSON.stringify(themes, null, 2)} as const;

const designTokens = ${JSON.stringify(variables, null, 2)} as const;

export default designTokens;
`;
};

const printCss = (data) => `
/*
  THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

  This file is created by the 'scripts/generate-design-tokens.js' script.
  The variables should be updated in 'materials/internals/definition.yaml'.
*/

:root {
  ${Object.entries(data.default)
    .map(([key, value]) => `--${key}: ${value};`)
    .join('\n')}
}
`;

// Generates `custom-properties.json` only for the default theme
// This file is now deprecated and will be remove in the future
fs.writeFileSync(
  path.join(__dirname, '../materials/custom-properties.json'),
  prettier.format(printJson(designTokens), {
    ...prettierConfig,
    parser: 'json',
  })
);

// Generates `custom-properties.css` only for the default theme
// This file is now deprecated and will be remove in the future
fs.writeFileSync(
  path.join(__dirname, '../materials/custom-properties.css'),
  prettier.format(printCss(designTokens), {
    ...prettierConfig,
    parser: 'css',
  })
);

fs.writeFileSync(
  path.join(__dirname, '../src/design-tokens.ts'),
  prettier.format(printDesignTokens(designTokens), {
    ...prettierConfig,
    parser: 'typescript',
  })
);

console.log('\nDesign tokens built!\n');
