import percySnapshot from '@percy/puppeteer';

describe('QuickFilters', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/quick-filters`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/Renders an active + inactive item');
    await percySnapshot(page, 'Tag');
  });
});
