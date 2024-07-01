import fs from 'fs';
import { type } from 'os';
import path from 'path';
import pkg from '@lmstudio/sdk';
const { LMStudioClient } = pkg;

const client = new LMStudioClient();

async function main({ fileContents, filePath }) {
  //const modelPath = 'second-state/StarCoder2-15B-GGUF/starcoder2-15b-Q8_0.gguf';
  const modelPath =
    'QuantFactory/Meta-Llama-3-8B-Instruct-GGUF/Meta-Llama-3-8B-Instruct.Q8_0.gguf';
  //const modelPath =    'MaziyarPanahi/Meta-Llama-3-70B-Instruct-GGUF/Meta-Llama-3-70B-Instruct.IQ1_M.gguf';
  const llama3 = await client.llm.load(modelPath, {
    config: { gpuOffload: 'max', stream: false },
  });
  const prediction = llama3.respond(
    [
      {
        role: 'system',
        content: 'Be a helpful assistant',
      },
      {
        role: 'user',
        content: `
Parse the componentName and the importPath of the component that is being tested here, return a JSON-object.

${fileContents}
      `,
      },
    ],
    {
      maxPredictedTokens: 512,
    }
  );

  for await (const text of prediction) {
    process.stdout.write(text);
  }

  const { stats } = await prediction;
  console.log(stats);
}

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
  console.log('Waiting for response...');

  for (const storyFile of storyFiles) {
    const fileContents = await fs.promises.readFile(storyFile.filePath, 'utf8');
    const pred = await main({ fileContents, fileNames: storyFile.fileName });
    const data = await createBaseStory(storyFile);
    console.log(data);
  }
})();

//console.log(storyFiles);
