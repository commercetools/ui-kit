import percySnapshot from '@percy/puppeteer';

describe('Text', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/text`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/Headline - h1');
    await percySnapshot(page, 'Text');
  });
});
