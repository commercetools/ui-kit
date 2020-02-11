import { percySnapshot } from '@percy/puppeteer';

describe('Messages', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/messages`);
  });

  it('Default', async () => {
    await expect(page).toMatch('An error message');
    await percySnapshot(page, 'Messages');
  });
});
