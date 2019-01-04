import { percySnapshot } from '@percy/puppeteer';

describe('PrimaryActionDropdown', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/primary-action-dropdown`);
  });

  it('Default', async () => {
    await expect(page).toMatch('Primary option');
    await percySnapshot(page, 'PrimaryActionDropdown');
  });
});
