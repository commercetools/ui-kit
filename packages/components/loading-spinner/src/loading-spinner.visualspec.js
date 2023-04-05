import percySnapshot from '@percy/puppeteer';

describe('LoadingSpinner', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/loading-spinner`);
    await page.waitForTimeout(1001);
  });

  it('Default', async () => {
    await page.waitForSelector(
      'text/with scale "l", maxDelayDuration "1000" (default)'
    );
    await percySnapshot(page, 'LoadingSpinner');
  });
});
