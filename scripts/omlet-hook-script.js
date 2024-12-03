/**
 * @type {import('@omlet/cli').CliHookModule}
 */
module.exports = {
  async afterScan(components) {
    for (const component of components) {
      // if there is no file, it's an external depedency like react-intl, react-select or downshift
      if (component.filePath) {
        component.setMetadata('owner', 'First Contact');
      } else {
        // Component from external component library
        component.setMetadata('package_name', component.component.package_name);
      }
    }
  },
};
