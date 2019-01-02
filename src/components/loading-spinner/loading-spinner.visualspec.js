import { percySnapshot } from '@percy/puppeteer';

describe('LoadingSpinner', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/loading-spinner`);
  });

  it('Default', async () => {
    await expect(page).toMatch('with scale "l" (default)');
    await percySnapshot(page, 'LoadingSpinner');
  });
});
