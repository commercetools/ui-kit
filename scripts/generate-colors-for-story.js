const fs = require('fs');
const path = require('path');
const css = require('css');
const isVariation = require('../src/utils/is-variation');

const importPath = path.join(
  __dirname,
  '../src/materials/colors/base-colors.mod.css'
);
const exportPath = path.join(
  __dirname,
  '../src/materials/colors/colors-for-story.mod.css'
);
const loadedFile = fs.readFileSync(importPath, 'utf8');
const fileToBeTransformed = css.parse(loadedFile);

// Path where decision file is located, for documentation purposes only
const originalPath = 'materials/colors/decisions/base-colors.json';

// Gets all declarations inside the `:root` selector from fileToBeTransformed
const rootRulesFromFileToBeTransformed = fileToBeTransformed.stylesheet.rules.find(
  rule => rule.type === 'rule' && rule.selectors.includes(':root')
);

// Creates the css classes declarations based on the variables
const declarationsBodyObj = rootRulesFromFileToBeTransformed.declarations.reduce(
  (acc, declaration) => {
    // If its a comment, ignore it
    if (declaration.type === 'comment') {
      return acc;
    }

    // Adds the variable as a class
    acc.push({
      type: 'rule',
      // Removes the prefix so they can be used as a class
      selectors: [`.${declaration.property.replace('--color-', '')}`],
      declarations: [
        {
          type: 'declaration',
          property: 'background-color',
          value: declaration.value,
        },
      ],
    });

    return acc;
  },
  []
);

// Creates the variables for main colors, so they can be composed to change the lightness channel
const declarationsRootRule = rootRulesFromFileToBeTransformed.declarations.reduce(
  (acc, declaration) => {
    // If its a comment, ignores it
    if (declaration.type === 'comment') {
      return acc;
    }

    // Creates the main colors variables
    if (!isVariation(declaration.property)) {
      acc.push({
        type: 'declaration',
        property: declaration.property,
        value: declaration.value,
      });
    }

    return acc;
  },
  []
);

const declarationsRootRuleObj = {
  type: 'rule',
  selectors: [':root'],
  declarations: [...declarationsRootRule],
};

// This comment gets added in the top of the page
const commentDoNotModify = {
  type: 'comment',
  comment: ` THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
  This file is created by 'scripts/generate-colors-for-story.js' script. The real
  colors's values should be updated in '${originalPath}';
  This file is used to list the colors in the UIKit Color's story purposes only. `,
};

// Defines the CSS AST to be stringified
const AST = {
  type: 'stylesheet',
  stylesheet: {
    rules: [
      commentDoNotModify,
      declarationsRootRuleObj,
      ...declarationsBodyObj,
    ],
    parsingErrors: [],
  },
};

// Generates the file
fs.writeFileSync(exportPath, `${css.stringify(AST)}\n`);
