import percySnapshot from '@percy/puppeteer';

describe('MoneyField', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/money-field`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/Price');
    await percySnapshot(page, 'MoneyField');
  });
});
