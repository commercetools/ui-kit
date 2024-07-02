import fs from 'fs';
import path from 'path';
import { Keyboard } from 'puppeteer';

function findStoryFiles(directory) {
  const storyFiles = [];

  function traverseDirectory(currentDir) {
    const files = fs.readdirSync(currentDir);

    files.forEach((file) => {
      const filePath = path.join(currentDir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        traverseDirectory(filePath);
      } else if (file.endsWith('.story.js')) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const storyObject = {
          filePath,
          fileContent,
        };
        storyFiles.push(storyObject);
      }
    });
  }

  traverseDirectory(directory);

  return storyFiles;
}

const createBaseStory = async ({ filePath, fileContent }) => {
  const fileName = path.basename(filePath);
  const componentName = fileName
    .split('.')[0]
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  const importPath =
    './' + componentName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  return { filePath, fileName, importPath, componentName };
};

(async () => {
  const componentsDir = '/Volumes/Code/ui-kit/packages/components';
  const storyFiles = findStoryFiles(componentsDir);

  const result = [];

  for (const storyFile of storyFiles) {
    result.push(await createBaseStory(storyFile));
  }

  // 1. Create stories.tsx file
  // 2. Fill with example data

  const templateFn = ({ componentName, category }) => {
    return `import type { Meta, StoryObj } from '@storybook/react';
import ${componentName} from './${pascalToKebabCase(componentName)}';

const meta: Meta<typeof ${componentName}> = {
  title: 'unported/${category ? category + '/' : ''}${componentName}',
  component: ${componentName},
};
export default meta;

type Story = StoryObj<typeof ${componentName}>;

export const BasicExample: Story = {};
`;
  };

  const mdxTemplateFn = ({ componentName, category }) => {
    return `import { Meta, Markdown } from '@storybook/blocks';
import ReadMe from './../README.md?raw';

<Meta title="unported/${
      category ? category + '/' : ''
    }${componentName}/Readme" />

<Markdown>{ReadMe}</Markdown>
`;
  };

  for (const storyFile of result) {
    const newFilePath = storyFile.filePath.replace('.story.js', '.stories.tsx');
    const readmeFilePath = storyFile.filePath.replace(
      '.story.js',
      '.readme.mdx'
    );

    const arr = path.basename(newFilePath).split('.');
    const category = arr.length > 3 ? arr[1] : null;

    const tsxContent = templateFn({ ...storyFile, category });
    const readmeContent = mdxTemplateFn({ ...storyFile, category });

    //console.log('fileName', category, fileName);
    fs.writeFileSync(newFilePath, tsxContent);
    fs.writeFileSync(readmeFilePath, readmeContent);
    //console.log(`File ${newFilePath} created.`);
    //console.log(tsxContent);
  }
})();

function pascalToKebabCase(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function transformFirstLetterUppercase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
