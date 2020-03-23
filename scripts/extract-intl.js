/* eslint-disable no-console */

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
  throw err;
});

require('shelljs/global');
const fs = require('fs');
const path = require('path');
const mri = require('mri');
const nodeGlob = require('glob');
const { transformAsync } = require('@babel/core');

const flags = mri(process.argv.slice(2), {
  alias: { help: ['h'] },
  default: { locale: 'en' },
});
const commands = flags._;

if (commands.length === 0 || (flags.help && commands.length === 0)) {
  console.log(`
  Usage: scripts/extract-intl.js [options] <glob-pattern>..

  Options:
  --output-path         The location where to put the extracted messages
  --locale=<locale>     (optional) The default locale to use [default "en"]
  `);
  process.exit(0);
}

if (!flags['output-path']) {
  throw new Error('Missing required option "--output-path"');
}

// Resolve the absolute path of the caller location. This is necessary
// to point to files within that folder.
const rootPath = process.cwd();
const locales = ['en', 'de', 'es', 'fr-FR', 'zh-CN', 'ja'];
const defaultLocale = flags.locale;
const outputPath = flags['output-path'];
const globFilesToParse = commands[0];

const newLine = () => process.stdout.write('\n');

const task = (message) => {
  process.stdout.write(message);

  return (error) => {
    if (error) {
      process.stderr.write(error);
    }
    return newLine();
  };
};

// Wrap async functions below into a promise
const glob = (pattern) =>
  new Promise((resolve, reject) => {
    nodeGlob(pattern, (error, value) =>
      error ? reject(error) : resolve(value)
    );
  });

const readFile = (fileName) =>
  new Promise((resolve, reject) => {
    fs.readFile(fileName, (error, value) =>
      error ? reject(error) : resolve(value)
    );
  });

const writeFile = (fileName, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(fileName, data, (error, value) =>
      error ? reject(error) : resolve(value)
    );
  });

// Store existing translations into memory
const coreMessages = {};
const oldLocaleMappings = [];
const localeMappings = [];
// Loop to run once per locale
locales.forEach((locale) => {
  oldLocaleMappings[locale] = {};
  localeMappings[locale] = {};
  // File to store translation messages into
  const translationFileName = `${outputPath}/${locale}.json`;
  try {
    // Parse the old translation message JSON files
    const messages = JSON.parse(fs.readFileSync(translationFileName));
    const messageKeys = Object.keys(messages);
    messageKeys.forEach((messageKey) => {
      oldLocaleMappings[locale][messageKey] = messages[messageKey];
    });
  } catch (error) {
    if (error.code !== 'ENOENT') {
      process.stderr.write(
        `There was an error loading this translation file: ${translationFileName}
        \n${error}`
      );
    }
  }
});

const sortMessages = (localeMessages) => {
  // Sort the translation JSON file so that git diffing is easier
  // Otherwise the translation messages will jump around every time we extract
  const sortedMessages = {};
  Object.keys(localeMessages)
    // transform strings to lowercase to imitate phraseapp sorting
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
    .forEach((key) => {
      sortedMessages[key] = localeMessages[key];
    });
  return sortedMessages;
};

const extractFromFile = async (fileName) => {
  try {
    const src = await readFile(path.join(rootPath, fileName));
    // Use babel plugin to extract instances where react-intl is used
    const { metadata: result } = await transformAsync(src, {
      filename: fileName,
    });
    result['react-intl'].messages.forEach((message) => {
      // Extract core messages
      coreMessages[message.id] = message.defaultMessage;
      // Extract and map messages for each locale
      locales.forEach((locale) => {
        const oldLocaleMapping = oldLocaleMappings[locale][message.id];
        // Merge old translations into the babel extracted instances where react-intl is used
        const newMsg = locale === defaultLocale ? message.defaultMessage : '';
        localeMappings[locale][message.id] = oldLocaleMapping || newMsg;
      });
    });
  } catch (error) {
    process.stderr.write(
      `Error transforming file: ${fileName}\n${error.stack}\n\n`
    );
  }
};

(async function main() {
  // Make the directory if it doesn't exist, especially for first run
  // eslint-disable-next-line no-undef
  mkdir('-p', outputPath);

  const memoryTaskDone = task('Storing language files in memory');
  const files = (await glob(globFilesToParse)).filter(
    // exclude node_modules on non-root-level (due to monorepo-setup)
    (file) => !file.match(/node_modules/) && !file.match(/dist/)
  );
  memoryTaskDone();

  const extractTaskDone = task('Run extraction on all files');
  // Run extraction on all files that match the glob
  await Promise.all(files.map((fileName) => extractFromFile(fileName)));
  extractTaskDone();

  const coreTranslationFileName = `${outputPath}/core.json`;
  let localeTaskDone = task(
    `Writing core translation messages to: ${coreTranslationFileName}`
  );
  try {
    const messages = sortMessages(coreMessages);

    // Write to file the JSON representation of the translation messages
    const prettified = `${JSON.stringify(messages, null, 2)}\n`;

    await writeFile(coreTranslationFileName, prettified);

    localeTaskDone();
  } catch (error) {
    localeTaskDone(
      `There was an error saving this translation file: ${coreTranslationFileName}
      \n${error}`
    );
  }

  await Promise.all(
    locales.map(async (locale) => {
      const translationFileName = `${outputPath}/${locale}.json`;

      localeTaskDone = task(
        `Writing translation messages for ${locale} to: ${translationFileName}\n`
      );
      try {
        const messages = sortMessages(localeMappings[locale]);

        // Write to file the JSON representation of the translation messages
        const prettified = `${JSON.stringify(messages, null, 2)}`;

        await writeFile(translationFileName, prettified);

        localeTaskDone();
      } catch (error) {
        localeTaskDone(
          `There was an error saving this translation file: ${translationFileName}
        \n${error}`
        );
      }
    })
  );

  process.exit();
})();
