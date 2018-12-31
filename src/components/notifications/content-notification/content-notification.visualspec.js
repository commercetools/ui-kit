import { percySnapshot } from '@percy/puppeteer';

describe('ContentNotification', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/content-notification`);
  });

  it('Default', async () => {
    await expect(page).toMatch('when type is error');
    await percySnapshot(page, 'ContentNotification');
  });
});
