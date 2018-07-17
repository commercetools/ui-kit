const fs = require('fs');
const path = require('path');
const parser = require('css');

const css = fs.readFileSync(
  path.join(__dirname, '../materials/colors.mod.css'),
  'utf-8'
);
const ast = parser.parse(css);
const rootRule = ast.stylesheet.rules.find(
  rule => rule.type === 'rule' && rule.selectors.includes(':root')
);
const colorGroups = rootRule.declarations.reduce((colors, declaration) => {
  if (declaration.type === 'comment') {
    return [...colors, []];
  }
  return [
    ...colors.slice(0, -1),
    [
      ...colors[colors.length - 1],
      {
        key: declaration.property,
        name: declaration.property.replace(/--color-/, ''),
        value: declaration.value,
      },
    ],
  ];
}, []);
fs.writeFileSync(
  path.join(__dirname, '../materials/colors/colors-for-story.json'),
  JSON.stringify(colorGroups, null, 2),
  'utf-8'
);
