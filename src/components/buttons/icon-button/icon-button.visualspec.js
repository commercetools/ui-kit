import { percySnapshot } from '@percy/puppeteer';

describe('IconButton', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/icon-button');
  });

  it('Default', async () => {
    await expect(page).toMatch('A label text');
    await percySnapshot(page, 'IconButton');
  });
});
