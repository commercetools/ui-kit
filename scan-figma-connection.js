const fs = require('node:fs/promises');
const path = require('path');

/*
 * This script is used to assist with maintaining figma connect files for components
 * What it does:
 * - It searches for root React component files in a given directory
 * - It checks for a corresponding `.figma.tsx` file
 * - If the `.figma.tsx` file does not exist, it creates one based on `getConnectFileContent`
 * - If the `.figma.tsx` file exists, it is read to check for completion (content contains "TODO")
 * What it does not do:
 * - It does not read the component file to get the props
 * - It does not map the props to the figma file
 * - It does not know the correct node id for the figma component, which is required
 * **PLEASE NOTE:**
 * Before the figma file can be published, the node id must be manually added!
 */

// Helpers
const getConnectFileContent = (componentName) => {
  return `// @ts-nocheck
import { ${componentName} } from '@commercetools-frontend/ui-kit';
import figma from '@figma/code-connect';

// REQUIRED: supply node id for the figma component
figma.connect(
  ${componentName},
  'https://www.figma.com/design/UoqmtHSHwxvEZRcbsM4A3Z/CT-product-design-system?node-id=<placeholder>',
  {
    props: {
      // *This file was generated from a script*
      // TODO: manually map props here, see https://www.figma.com/code-connect-docs/react/#figmaconnect
      children: figma.children('*'),
    },
    example: (props) => <${componentName}>{props.children}</${componentName}>,
  }
);
`;
};

const getComponentName = (str) => {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
};

/**
 * `scanConnectedComponents` recursively searches for the root React component file in a given directory.
 * For each root file found, it checks for a corresponding `.figma.tsx` file.
 * If the `.figma.tsx` file does not exist, it creates one based on a predefined template.
 * If the `.figma.tsx` file exists, it checks if the file content contains "TODO".
 *
 * @param {string} dir - The starting directory path.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */

const scanConnectedComponents = async (dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // skip icons and utils directories
      if (entry.name.includes('icons') || entry.name.includes('utils')) {
        continue;
      }
      // Recurse into subdirectories
      await scanConnectedComponents(entryPath);
    } else if (entry.isFile() && path.extname(entry.name) === '.tsx') {
      // Exclude test files and stories
      if (
        entry.name.includes('.spec.tsx') ||
        entry.name.includes('.styles') ||
        entry.name.includes('.stories.tsx')
      ) {
        continue;
      }

      const componentName = path.basename(entry.name, '.tsx');
      const figmaFilePath = path.join(dir, `${componentName}.figma.tsx`);

      // TODO: This shouldn't be necessary, but currently it is
      if (figmaFilePath.includes('.figma.figma')) continue;

      try {
        // Check if `.figma.tsx` file exists
        const figmaStat = await fs.stat(figmaFilePath);
        if (figmaStat.isFile()) {
          // Read the `.figma.tsx` file and check for "TODO" or "<placeholder>"
          const figmaFileContent = await fs.readFile(figmaFilePath, 'utf8');
          if (
            figmaFileContent.includes('TODO') ||
            figmaFileContent.includes('<placeholder>')
          ) {
            console.log(`-> ${figmaFilePath} is incomplete`);
          } else {
            continue;
          }
        }
      } catch (err) {
        if (err.code === 'ENOENT') {
          // `.figma.tsx` file does not exist, create it
          await fs.writeFile(
            figmaFilePath,
            getConnectFileContent(getComponentName(componentName))
          );
          console.log(`Created Figma connect file: ${figmaFilePath}`);
        } else {
          console.error(`Error checking file: ${figmaFilePath}`, err);
        }
      }
    }
  }
};

// Intended use
scanConnectedComponents('packages/components')
  .then(() => {
    console.log('Scan complete.');
  })
  .catch((err) => {
    console.error('Error thrown during scan:', err);
  });
