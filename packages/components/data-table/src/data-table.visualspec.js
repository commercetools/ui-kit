import percySnapshot from '@percy/puppeteer';

describe('DataTable', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/data-table`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/default');
    await percySnapshot(page, 'DataTable');
  });
});
