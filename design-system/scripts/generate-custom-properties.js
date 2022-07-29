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
  /^(\w+(?:-\w+)(?:-\w+)?)(?:-for-(\w+(?:-\w+)?))?(?:-when-([\w-]+?))?(?:-on-([\w-]+?))?$/i;

const supportedStates = Object.keys(definitions.states);
const supportedComponentGroups = Object.keys(definitions.componentGroups);
const allThemesNames = Object.keys(definitions.choiceGroupsPerTheme);

const tokens = {};
const designTokens = {};

Object.entries(definitions.choiceGroupsPerTheme).forEach(
  ([themeName, themeChoiceGroups]) => {
    if (!tokens[themeName]) {
      tokens[themeName] = {};
    }
    Object.values(themeChoiceGroups).forEach((themeChoiceGroup) => {
      Object.entries(themeChoiceGroup.choices).forEach(([key, value]) => {
        if (tokens[themeName][key])
          endProgram(`Token "${key} already exists!"`);

        if (key !== key.toLowerCase())
          endProgram(`Tokens "${key}" must be lower case`);

        if (!key.startsWith(themeChoiceGroup.prefix))
          endProgram(
            `Expected token "${key}" to start with "${themeChoiceGroup.prefix}" as it is an "${themeChoiceGroup.label}" attribute.`
          );

        tokens[themeName][key] = value;
      });
    });
  }
);

allThemesNames.forEach((themeName) => {
  Object.values(definitions.decisionGroups).forEach((decisionGroup) => {
    Object.entries(decisionGroup.decisions).forEach(([key, decision]) => {
      if (tokens[themeName][key]) endProgram(`Token "${key} already exists!"`);
      if (key !== key.toLowerCase())
        endProgram(`Tokens "${key}" must be lower case`);
      if (!decision.choice) {
        endProgram(`You forgot to specify a choice for ${decision}`);
      }
      if (!tokens[themeName][decision.choice]) {
        endProgram(`Choice called "${decision.choice}" was not found!`);
      }
      // TODO parse token name and warn when invalid name was given and token
      // is not deprecated

      const match = key.match(TOKEN_REGEX);

      if (match) {
        const componentGroup = match[2];
        const state = match[3];

        if (
          componentGroup &&
          !supportedComponentGroups.includes(componentGroup)
        )
          endProgram(
            `Token "${key}" uses unsupported component group "${componentGroup}"!`
          );

        if (state && !supportedStates.includes(state))
          endProgram(`Token "${key}" uses unsupported state "${state}"!`);
      } else if (!decision.deprecated) {
        endProgram(
          `Token "${key}" does not follow <attribute>-for-<component-group>-when-<state>-on-dark naming scheme! Tokens not following this scheme must use "deprecated" flag.`
        );
      }

      designTokens[key] = decision.choice;
      tokens[themeName][key] = tokens[themeName][decision.choice];
    });
  });
});

// Copy over plain tokens
allThemesNames.forEach((themeName) => {
  Object.entries(definitions.plainTokens).forEach(([key, value]) => {
    if (tokens[themeName][key])
      endProgram(`Token called "${key} already exists!"`);

    if (!tokens[themeName]) tokens[themeName] = {};

    tokens[themeName][key] = value;
  });
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

const printCustomProperties = (data) => {
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
  This file is created by the 'scripts/generate-custom-properties.js' script.
  The variables should be updated in 'materials/internals/definition.yaml'.
*/
export const themes = ${JSON.stringify(themes, null, 2)} as const;

export const themesNames = ${JSON.stringify(
    Object.fromEntries(
      allThemesNames.map((themeName) => [themeName, themeName])
    ),
    null,
    2
  )} as const; 

const customProperties = ${JSON.stringify(variables, null, 2)} as const;

let _canUseCssVars: Boolean | null = null;
const canUseCssVars = (): Boolean => {
  if (_canUseCssVars === null) {
    _canUseCssVars =
      !Boolean(document.querySelector('meta[name="ui-kit-vrt-environment"]'));
  }
  return _canUseCssVars;
};
const proxyHandler = {
  get: (
    target: typeof customProperties,
    name: keyof typeof customProperties
  ) => {
    return canUseCssVars()
    ? target[name]
    : themes.default[name];
  },
};

export default new Proxy(customProperties, proxyHandler);
`;
};

const printDesignTokens = (data) => {
  const designTokens = Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      camelCase(key),
      camelCase(value),
    ])
  );

  return `
/*
  THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

  This file is created by the 'scripts/generate-custom-properties.js' script.
  The variables should be updated in 'materials/internals/definition.yaml'.
*/

export default ${JSON.stringify(designTokens, null, 2)} as const;
`;
};

const printCss = (data) => `
/*
  THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

  This file is created by the 'scripts/generate-custom-properties.js' script.
  The variables should be updated in 'materials/internals/definition.yaml'.
*/

:root {
  ${Object.entries(data.default)
    .map(([key, value]) => `--${key}: ${value};`)
    .join('\n')}
}
`;

// Generates `custom-properties.json` only for the default theme
fs.writeFileSync(
  path.join(__dirname, '../materials/custom-properties.json'),
  prettier.format(printJson(tokens), {
    ...prettierConfig,
    parser: 'json',
  })
);

// Generates `custom-properties.css` only for the default theme
fs.writeFileSync(
  path.join(__dirname, '../materials/custom-properties.css'),
  prettier.format(printCss(tokens), {
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

fs.writeFileSync(
  path.join(__dirname, '../src/custom-properties.ts'),
  prettier.format(printCustomProperties(tokens), {
    ...prettierConfig,
    parser: 'typescript',
  })
);
