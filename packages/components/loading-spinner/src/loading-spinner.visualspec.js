import percySnapshot from '@percy/puppeteer';
import { setTimeout } from 'node:timers/promises';

describe('LoadingSpinner', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/loading-spinner`);
    await setTimeout(1001);
  });

  it('Default', async () => {
    await page.waitForSelector(
      'text/with scale "l", maxDelayDuration "1000" (default)'
    );
    await percySnapshot(page, 'LoadingSpinner');
  });
});
