import { percySnapshot } from '@percy/puppeteer';

describe('SecondaryButton', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/secondary-button`);
  });

  it('Default', async () => {
    await expect(page).toMatch('A label text');
    await percySnapshot(page, 'SecondaryButton');
  });
});
