import percySnapshot from '@percy/puppeteer';

describe('Link', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/link`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/A label text');
    await percySnapshot(page, 'Link');
  });
});
