import percySnapshot from '@percy/puppeteer';

describe('SecondaryIconButton', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/secondary-icon-button`);
  });

  it('Default', async () => {
    await expect(page).toMatch('A label text');
    await percySnapshot(page, 'SecondaryIconButton');
  });
});
