import { percySnapshot } from '@percy/puppeteer';

describe('Toggle', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/toggle`);
  });

  it('Default', async () => {
    await expect(page).toMatch('Default');
    await percySnapshot(page, 'Toggle');
  });
});
