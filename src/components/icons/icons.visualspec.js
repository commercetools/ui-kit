import { percySnapshot } from '@percy/puppeteer';

describe('Icons', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/icons');
  });

  it('Icons', async () => {
    await expect(page).toMatch('AddBoldIcon');
    await percySnapshot(page, 'Icons');
  });
});
