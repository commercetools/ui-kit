import { percySnapshot } from '@percy/puppeteer';
import { widths } from '../../../test/percy/widths';

describe('LoadingSpinner', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/loading-spinner');
  });

  it('LoadingSpinner', async () => {
    await expect(page).toMatch('with scale "l" (default)');
    await percySnapshot(page, 'LoadingSpinner', { widths });
  });
});
