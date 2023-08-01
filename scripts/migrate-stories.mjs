import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { Configuration, OpenAIApi } from "openai";
import { globby } from 'globby';

const configuration = new Configuration({
  apiKey: '',
});
const openai = new OpenAIApi(configuration);

const wait = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));

const examples = {
  avatar: '../packages/components/avatar/src/',
  'primary-button': '../packages/components/buttons/primary-button/src/',
  'select-input': '../packages/components/inputs/select-input/src/',
  'rich-text-input': '../packages/components/inputs/rich-text-input/src/',
  'text-input': '../packages/components/inputs/text-input/src/',
}

const generateInitialPrompt = () => `
  I'd like you to act as a very high quality software engineer.
  You are working on a project where you need to migrate a large number of stories from Storybook v5 to Storybook v7.
  I will initially provide a list of examples. Stories written in v5 format and their corresponding v7 migrated code.
  v5 stories are written in JavaScript and v7 stories are written in TypeScript.
  After that, I'll provide a list of stories written in v5 format and I'd like you to write the corresponding v7 migrated code (in Typescript).

  Now I will give you a list of v5 examples and I'd like you to write the corresponding v7 migrated code (in Typescript).
  I will provide one prompt at a time and you will write the corresponding v7 migrated code (in Typescript).
  The process will finish when I send you the message "The End!".
`;

const generateMigrationExamplePrompt = async (componentName, componentPath) => {
  const v5Code = await readFile(`${join(componentPath, componentName + '.story.js')}`, 'utf-8');
  const v7Code = await readFile(`${join(componentPath, componentName + '.new.stories.tsx')}`, 'utf-8');
  return `
    ----------------------------------------------
    Example for ${componentName} (Storybook v5):
    ${v5Code}

    Example for ${componentName} (Storybook v7):
    ${v7Code}
    ----------------------------------------------
  `;
}

const generateMigrationRequestPrompt = async (legacyStoryFilePath) => {
  const componentName = legacyStoryFilePath.split('/').pop().split('.')[0];
  const v5Code = await readFile(`${legacyStoryFilePath}`, 'utf-8');
  return `
    ----------------------------------------------
    Please write the corresponding migrated code for Storybook 7 (in Typescript).
    Example for ${componentName} (Storybook v5):

    ${v5Code}
    ----------------------------------------------
  `;
};

async function run() {

  // try {
  //   const completion = await openai.createCompletion({
  //     model: "text-davinci-003",
  //     prompt: "Hello world",
  //   });

  //   console.log({ completion: JSON.stringify(completion.data, null, 2) });

  // } catch (error) {
  //   console.log({ error });
  // }


  const initialPrompt = generateInitialPrompt();

  const completion = await openai.createCompletion({
    model: "gpt-3.5-turbo",
    prompt: initialPrompt,
  });

  // const promises = Object.entries(examples)
  //   .map(([componentName, componentPath]) =>
  //     generateMigrationExamplePrompt(componentName, componentPath));

  // const examplesPrompts = await Promise.all(promises);

  console.log({ completion: JSON.stringify(completion.data, null, 2) });

  // const _filesToBeMigrated = await globby(['../packages/**/*.story.js']);

  // const filesToBeMigrated = [_filesToBeMigrated[0]];

  // for (const filePath of filesToBeMigrated) {
  //   const migrationRequestPrompt = await generateMigrationRequestPrompt(filePath);
  //   const destinationFilePath = filePath.replace('.story.js', '.new.stories.tsx');
  //   await writeFile(destinationFilePath, migrationResponse);
  //   await wait(1000);
  // }
}

run();
