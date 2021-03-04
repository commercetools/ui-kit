import percySnapshot from '@percy/puppeteer';

describe('MoneyField', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/money-field`);
  });

  it('Default', async () => {
    await expect(page).toMatch('Price');
    await percySnapshot(page, 'MoneyField');
  });
});
