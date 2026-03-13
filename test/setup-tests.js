import fs from 'fs';
import path from 'path';
import { TextEncoder, TextDecoder } from 'util';
import colors from 'colors/safe';

global.window.app = {
  mcApiUrl: 'http://localhost:8080',
};

if (global.document) {
  document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: {
      nodeName: 'BODY',
      ownerDocument: document,
    },
  });
}

// Fix missing globals when `jsdom` is used in a test environment.
// See https://github.com/jsdom/jsdom/issues/2524#issuecomment-1108991178.
// Also https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom.
Object.defineProperty(window, 'TextEncoder', {
  writable: true,
  value: TextEncoder,
});
Object.defineProperty(window, 'TextDecoder', {
  writable: true,
  value: TextDecoder,
});

const silenceConsoleWarnings = [];
const notThrowWarnings = [
  /"children" property of "Stamp" component has been deprecated/,
];

const shouldSilenceWarnings = (...messages) =>
  silenceConsoleWarnings.some((msgRegex) =>
    messages.some((msg) => msgRegex.test(msg))
  );

const shouldNotThrowWarnings = (...messages) =>
  notThrowWarnings.some((msgRegex) =>
    messages.some((msg) => msgRegex.test(msg))
  );

// setup file
const logOrThrow = (log, method, messages) => {
  const warning = `console.${method} calls not allowed in tests`;
  if (process.env.CI) {
    if (shouldSilenceWarnings(messages)) return;

    log(warning, '\n', ...messages);

    // NOTE: That some warnings should be logged allowing us to refactor graceully
    // without having to introduce a breaking change.
    if (shouldNotThrowWarnings(messages)) return;

    throw new Error(...messages);
  } else {
    log(colors.bgYellow.black(' WARN '), warning, '\n', ...messages);
  }
};

// eslint-disable-next-line no-console
const logMessage = console.log;
global.console.log = (...messages) => {
  logOrThrow(logMessage, 'log', messages);
};

// eslint-disable-next-line no-console
const logInfo = console.info;
global.console.info = (...messages) => {
  logOrThrow(logInfo, 'info', messages);
};

// eslint-disable-next-line no-console
const logWarning = console.warn;
global.console.warn = (...messages) => {
  logOrThrow(logWarning, 'warn', messages);
};

// eslint-disable-next-line no-console
const logError = console.error;
global.console.error = (...messages) => {
  logOrThrow(logError, 'error', messages);
};

// Avoid unhandled promise rejections from going unnoticed
// https://github.com/facebook/jest/issues/3251#issuecomment-299183885
// In Node v7 unhandled promise rejections will terminate the process
if (!process.env.LISTENING_TO_UNHANDLED_REJECTION) {
  process.on('unhandledRejection', (reason) => {
    logMessage('UNHANDLED REJECTION', reason);

    // We create a file in case there is an unhandled rejection
    // We later check for the existence of this file to fail CI
    if (process.env.CI && !process.env.HAS_CREATED_UNHANDLED_REJECTION_FILE) {
      const rootPath = process.cwd();
      fs.writeFileSync(
        path.join(
          rootPath,
          './fail-tests-because-there-was-an-unhandled-rejection.lock'
        ),
        ''
      );
      process.env.HAS_CREATED_UNHANDLED_REJECTION_FILE = true;
    }
  });
  // Avoid memory leak by adding too many listeners
  process.env.LISTENING_TO_UNHANDLED_REJECTION = true;
}
