import { percySnapshot } from '@percy/puppeteer';

describe('Messages', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/messages');
  });

  it('Default', async () => {
    await expect(page).toMatch('An error message');
    await percySnapshot(page, 'Messages');
  });
});
