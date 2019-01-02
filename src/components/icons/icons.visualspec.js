import { percySnapshot } from '@percy/puppeteer';

describe('Icons', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/icons`);
  });

  it('Default', async () => {
    await expect(page).toMatch('AddBoldIcon');
    await percySnapshot(page, 'Icons');
  });
});
