/**
 * NOTE:
 *  `no-sandbox` is passed as Puppeteer runs on Docker. This is a recommended CLI arg.
 *
 *  Ref: https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#setting-up-chrome-linux-sandbox
 */
module.exports = {
  launch: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    executablePath: 'google-chrome-stable',
  },
  server: {
    command: 'yarn visual-testing-app:serve',
    launchTimeout: 30000,
    port: 3001,
    launchTimeout: 20000,
  },
};
