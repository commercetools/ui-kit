import percySnapshot from '@percy/puppeteer';

describe('PrimaryButton', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/primary-button`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/A label text');
    await percySnapshot(page, 'PrimaryButton');
  });
});
