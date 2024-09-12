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
    command: 'pnpm visual-testing-app:preview',
    port: 3000,
    launchTimeout: 10000,
  },
};
