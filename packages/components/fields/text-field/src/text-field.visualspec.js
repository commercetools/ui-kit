import percySnapshot from '@percy/puppeteer';

describe('TextField', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/text-field`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/Welcome Text');
    await percySnapshot(page, 'TextField');
  });
});
