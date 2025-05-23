/**
 * This hook script is executed by "omlet analyze" after the scan phase.
 * It is used to add metadata to the scanned components.
 * @see https://docs.omlet.dev/discover-omlet/learn-omlet-cli/custom-component-properties#scanning-with-a-hook-script
 * @type {import('@omlet/cli').CliHookModule}
 */
module.exports = {
  async afterScan(components) {
    for (const component of components) {
      if (component.filePath) {
        /** = component is owned by us if */
        component.setMetadata('owner', 'First Contact');
      } else {
        /** = component from external component library */
        component.setMetadata('package_name', component.component.package_name);
      }
    }
  },
};
