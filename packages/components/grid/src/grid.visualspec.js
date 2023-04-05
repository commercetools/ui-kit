import percySnapshot from '@percy/puppeteer';

describe('Grid', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/grid`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/1');
    await percySnapshot(page, 'Grid');
  });
});
