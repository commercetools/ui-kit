import percySnapshot from '@percy/puppeteer';

describe('SelectableSearchInput', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/selectable-search-input`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/hello world');
    await percySnapshot(page, 'SelectableSearchInput');
  });
});
