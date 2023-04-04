import percySnapshot from '@percy/puppeteer';

describe('Pagination', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/pagination`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/');
    await percySnapshot(page, 'Pagination');
  });
});
