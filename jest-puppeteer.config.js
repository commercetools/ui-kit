/**
 * NOTE:
 *  `no-sandbox` is passed as Puppeteer runs on Docker. This is a recommended CLI arg.
 *
 *  Ref: https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#setting-up-chrome-linux-sandbox
 */

module.exports = {
  launch: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
    headless: 'new',
  },
  server: {
    command: 'yarn visual-testing-app:preview',
    host: 'localhost',
    port: 3000,
    launchTimeout: 20000,
    protocol: 'http',
  },
};
