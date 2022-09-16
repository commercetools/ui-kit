import percySnapshot from '@percy/puppeteer';

describe('ViewSwitcher', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/view-switcher`);
  });

  it('Default', async () => {
    await expect(page).toMatch(/View 1/);
    await percySnapshot(page, 'ViewSwitcher');
  });
});
