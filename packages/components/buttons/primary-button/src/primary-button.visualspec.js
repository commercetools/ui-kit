import percySnapshot from '@percy/puppeteer';

describe('PrimaryButton', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/primary-button`);
  });

  it('Default', async () => {
    await expect(page).toMatch('A label text');
    await percySnapshot(page, 'PrimaryButton');
  });
});
