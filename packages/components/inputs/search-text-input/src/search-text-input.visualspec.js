import percySnapshot from '@percy/puppeteer';

describe('SearchTextInput', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/search-text-input`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/hello world how are you');
    await percySnapshot(page, 'SearchTextInput');
  });
});
