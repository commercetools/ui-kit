import percySnapshot from '@percy/puppeteer';

describe('MoneyInput', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/money-input`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/minimal');
    await percySnapshot(page, 'MoneyInput');
  });
});
