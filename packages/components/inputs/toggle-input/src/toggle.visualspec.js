import percySnapshot from '@percy/puppeteer';

describe('Toggle', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/toggle`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/Default');
    await percySnapshot(page, 'Toggle');
  });
});
