import percySnapshot from '@percy/puppeteer';

describe('LoadingSpinner', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/loading-spinner`);
    await page.waitForTimeout(1001);
  });

  it('Default', async () => {
    await expect(page).toMatch(
      'with scale "l", maxDelayDuration "1000" (default)'
    );
    await percySnapshot(page, 'LoadingSpinner');
  });
});
