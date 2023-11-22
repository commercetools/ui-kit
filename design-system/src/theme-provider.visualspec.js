import percySnapshot from '@percy/puppeteer';

describe('ThemeProvider', () => {
  it('Default', async () => {
    await page.goto(`${globalThis.HOST}/theme-provider`);
    await page.waitForSelector('text/use global default theme');
    await percySnapshot(page, 'ThemeProvider');
  });
});
