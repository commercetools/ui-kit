import percySnapshot from '@percy/puppeteer';

describe('IconButton', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/icon-button`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/A label text');
    await percySnapshot(page, 'IconButton');
  });
});
