const createTransformer = require('./react-component-rename-props');

const componentNamesToRefactor = ['Text.Headline', 'Text.Subheadline'];

const propertyRenameMap = {
  elementType: 'as',
};

const transformer = createTransformer(
  componentNamesToRefactor,
  propertyRenameMap
);

module.exports = transformer;
