/* eslint-disable guard-for-in */

// Renames properties from specified components
module.exports = function createTransformer(
  componentNamesToRefactor,
  propertyRenameMap,
  valueRenameMap
) {
  const isAttributeInPropertyRenameMap = (path) =>
    // eslint-disable-next-line no-prototype-builtins
    propertyRenameMap.hasOwnProperty(path.value.name.name);

  const attributeBelongsToTargetComponent = (path) =>
    componentNamesToRefactor.includes(path.parent.value.name.name);

  const shouldAttributeBeRenamed = (path) =>
    attributeBelongsToTargetComponent(path) &&
    isAttributeInPropertyRenameMap(path);

  const renameComponentAttribute = (path) => {
    // eslint-disable-next-line no-param-reassign
    path.value.name.name =
      propertyRenameMap[path.value.name.name] || path.value.name.name;

    if (valueRenameMap && valueRenameMap[path.value.name.name]) {
      // eslint-disable-next-line no-param-reassign
      path.node.value.value =
        valueRenameMap[path.value.name.name][path.node.value.value];
    }

    return path.node;
  };

  return function transformer(file, api) {
    const jscodeshift = api.jscodeshift;

    let source = file.source;

    // Rename variable references
    // eslint-disable-next-line no-restricted-syntax
    for (const property in propertyRenameMap) {
      source = jscodeshift(source)
        .findVariableDeclarators(property)
        .renameTo(propertyRenameMap[property])
        .toSource();
    }
    // Rename JSX attributes
    source = jscodeshift(source)
      .find(jscodeshift.JSXAttribute)
      .filter(shouldAttributeBeRenamed)
      .replaceWith(renameComponentAttribute)
      .toSource();

    return source;
  };
};
