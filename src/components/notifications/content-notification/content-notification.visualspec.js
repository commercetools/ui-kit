import { percySnapshot } from '@percy/puppeteer';

describe('ContentNotification', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/content-notification');
  });

  it('Default', async () => {
    await expect(page).toMatch('when type is error');
    await percySnapshot(page, 'ContentNotification');
  });
});
