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

const TOKEN_REGEX =
  /^(\w+(?:-\w+)(?:-\w+)?)(?:-for-(\w+(?:-\w+)?))?(?:-when-([\w-]+?))?(?:-on-([\w-]+?))?(?:-variant-([\w-]+?))?$/i;

const supportedStates = Object.keys(definitions.states);
const supportedComponentGroups = Object.keys(definitions.componentGroups);
const supportedVariants = Object.keys(definitions.variants);

const designTokens = {};

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
          !designTokens.default[decision.choice]
        ) {
          endProgram(`Choice called "${decision.choice}" was not found!`);
        }
        // TODO parse token name and warn when invalid name was given and token
        // is not deprecated

        const match = key.match(TOKEN_REGEX);

        if (match) {
          const componentGroup = match[2];
          const state = match[3];
          const variant = match[4];

          if (
            componentGroup &&
            !supportedComponentGroups.includes(componentGroup)
          )
            endProgram(
              `Token "${key}" uses unsupported component group "${componentGroup}"!`
            );

          if (state && !supportedStates.includes(state))
            endProgram(`Token "${key}" uses unsupported state "${state}"!`);

          if (variant && !supportedVariants.includes(variant))
            endProgram(`Token "${key}" uses unsupported variant "${variant}"!`);
        } else if (!decision.deprecated) {
          endProgram(
            `Token "${key}" does not follow <attribute>-for-<component-group>-when-<state>-on-<theme> naming scheme! Tokens not following this scheme must use "deprecated" flag.`
          );
        }
        if (!designTokens[themeName]) {
          designTokens[themeName] = {};
        }

        designTokens[themeName][key] =
          designTokens[themeName][decision.choice] ||
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
