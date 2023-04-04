import percySnapshot from '@percy/puppeteer';

describe('LocalizedMultilineTextInput', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/localized-multiline-text-input`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/minimal');
    await percySnapshot(page, 'LocalizedMultilineTextInput');
  });
});
