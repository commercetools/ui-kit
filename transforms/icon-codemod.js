const createTransformer = require('./react-component-rename-props');
const componentNamesToRefactor = require('./icons/icon-names');

const propertyRenameMap = {
  theme: 'color',
};

const transformer = createTransformer(
  componentNamesToRefactor,
  propertyRenameMap
);

module.exports = transformer;
