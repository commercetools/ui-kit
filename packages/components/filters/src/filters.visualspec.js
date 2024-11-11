import percySnapshot from '@percy/puppeteer';

describe('FiltersList', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/filters`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/Filters');
    await percySnapshot(page, 'Filters');
  });
});
