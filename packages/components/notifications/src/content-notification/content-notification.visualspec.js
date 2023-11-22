import percySnapshot from '@percy/puppeteer';

describe('ContentNotification', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/content-notification`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/when type is error');
    await percySnapshot(page, 'ContentNotification');
  });
});
