import { percySnapshot } from '@percy/puppeteer';
import { widths } from '../../../../test/percy/widths';

describe('ContentNotification', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/content-notification');
  });

  it('ContentNotification', async () => {
    await expect(page).toMatch('when type is error');
    await percySnapshot(page, 'ContentNotification', { widths });
  });
});
