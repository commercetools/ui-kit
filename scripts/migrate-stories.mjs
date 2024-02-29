/* eslint-disable import/first */
import dotenv from 'dotenv';
dotenv.config({ path: '../.env'});

import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import OpenAI from "openai";
import { globby } from 'globby';

const OPEN_AI_MODEL = 'gpt-4'; // gpt-3.5-turbo | text-davinci-003 | gpt-4

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_TOKEN,
});

const wait = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));

const migratedStoriesExamples = [
  // 'avatar',
  'buttons/primary-button',
  'inputs/select-input',
  'inputs/rich-text-input',
  'inputs/text-input',
  'card',
  // 'buttons/secondary-icon-button',
  // 'buttons/flat-button',
  // 'buttons/secondary-button',
  // 'buttons/icon-button',
    // 'horizontal/horizontal',
  'field-label',
  'collapsible-motion',
  'label',
  // 'loading-spinner',
  'collapsible-panel',
    // 'icon',
  // 'grid',
  'data-table',
];

const generateInitialPrompt = () => `
  I'd like you to act as a very high quality software engineer.
  You are working on a project where you need to migrate a large number of stories from Storybook v5 to Storybook v7.
  I will initially provide a list of examples. Stories written in v5 format and their corresponding v7 migrated code.
  v5 stories are written in JavaScript and v7 stories are written in TypeScript.
  After that, I'll provide a list of stories written in v5 format and I'd like you to provide the corresponding v7 migrated code (in Typescript).
`;

const generateMigrationPrompt = () => `
  The list of examples is finished.
  Now I will give you a list of v5 examples and I'd like you to provide the corresponding v7 migrated code (in Typescript).
  I will provide one prompt at a time and you will provide the corresponding v7 migrated code (in Typescript).
  The process will finish when I send you the message "The End!".
`

const generateMigrationExamplePrompt = async (componentName) => {
  const componentPath = `../packages/components/${componentName}/src/`;
  const [directory, fileName] = componentName.split('/')
  const v5Code = await readFile(`${join(componentPath, (fileName || directory) + '.story.js')}`, 'utf-8');
  const v7Code = await readFile(`${join(componentPath, (fileName || directory) + '.stories.tsx')}`, 'utf-8');
  return `
    I just need for you to acknowledge you received this migration example.
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
  const v5Code = await readFile(`../packages/${legacyStoryFilePath}`, 'utf-8');
  return `
    ----------------------------------------------
    Please provide the corresponding migrated code for Storybook 7 (in Typescript).
    Your response should only contain the code.
    Example for ${componentName} (Storybook v5):

    ${v5Code}
    ----------------------------------------------
  `;
};

const getFilesPathsToBeMigrated = () => {
  return globby([
    '**/*.story.js',
    '!**/node_modules/**',
    ...migratedStoriesExamples.map(path => {
      const [directory, fileName] = path.split('/');
      return `!**/${fileName || directory}.story.js`;
    }),
  ], {
    cwd: '../packages',
  });
};

const sendMessageToAI = async (message) => {
  const completion = await openai.chat.completions.create({
    model: OPEN_AI_MODEL,
    messages: (Array.isArray(message) ? message : [message]).map(_message => ({
      role: 'user',
      content: _message
    })),
  });

  console.log({ completion: JSON.stringify(completion, null, 2) });
  return completion.choices[0].message.content;
}

async function run() {

  try {
    // We start by giving the context of the task to the AI
    console.log('---> Sending context prompt to AI');
    await sendMessageToAI(generateInitialPrompt());

    // Now we provide it with some migration examples in order to train it
    console.log('---> Fetching examples to train AI');
    const promises = migratedStoriesExamples
      .map((componentName, componentPath) =>
        generateMigrationExamplePrompt(componentName, componentPath));
    const examplesPrompts = await Promise.all(promises);
    console.log(`---> Sending (${examplesPrompts.length}) examples to AI`);
    // await sendMessageToAI(examplesPrompts);
    for (const example of examplesPrompts) {
      await sendMessageToAI(example);
    }

    // Get a list of all the stories to be migrated
    console.log('---> Getting Storybook files to be migrated');
    const _filesToBeMigrated = await getFilesPathsToBeMigrated();
    const filesToBeMigrated = [_filesToBeMigrated[0]];

    // // Ask AI to provide a migrated code and write it down to a file
    await sendMessageToAI(generateMigrationPrompt());
    for (const filePath of filesToBeMigrated) {
      console.log('---> Asking AI to migrate Storybook file:', filePath);
      const migrationRequestPrompt = await generateMigrationRequestPrompt(filePath);
      const migrationResponse = await sendMessageToAI(migrationRequestPrompt);
      const destinationFilePath = filePath.replace('.story.js', '.stories.tsx');
      await writeFile(`../packages/${destinationFilePath}`, migrationResponse);
      await wait(500);
    }

    await sendMessageToAI('The End!');
  } catch (error) {
    console.error(error);
  }
}

// FIRE THE PROCESS!!!
run();
