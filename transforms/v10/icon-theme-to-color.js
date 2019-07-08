const createTransformer = require('./react-component-rename-props');
const componentNamesToRefactor = require('./icons/icon-names');

const propertyRenameMap = {
  theme: 'color',
};

const valueRenameMap = {
  color: {
    black: 'solid',
    gray: 'neutral60',
    white: 'surface',
    blue: 'info',
    green: 'primary',
    'green-light': 'primary40',
    orange: 'warning',
    red: 'error',
  },
};

const transformer = createTransformer(
  componentNamesToRefactor,
  propertyRenameMap,
  valueRenameMap
);

module.exports = transformer;
