/**
 * NOTE:
 *  `no-sandbox` is passed as Puppeteer runs on Docker. This is a recommended CLI arg.
 *
 *  Ref: https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#setting-up-chrome-linux-sandbox
 */

console.log('env', {
  path: process.env.PUPPETEER_EXECUTABLE_PATH,
  skip: process.env.PUPPETEER_SKIP_CHROMIUM_DOWNLOAD,
});

module.exports = {
  launch: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
  },
  server: {
    command: 'yarn visual-testing-app:serve',
    port: 3001,
    launchTimeout: 10000,
  },
};
