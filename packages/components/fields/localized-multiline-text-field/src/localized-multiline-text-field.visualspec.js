import percySnapshot from '@percy/puppeteer';

describe('LocalizedMultilineTextField', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/localized-multiline-text-field`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/Welcome Text');
    await percySnapshot(page, 'LocalizedMultilineTextField');
  });
});
