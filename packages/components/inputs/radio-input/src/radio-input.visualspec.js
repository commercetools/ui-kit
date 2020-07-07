import { percySnapshot } from '@percy/puppeteer';

describe('Radio', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/radio-input`);
  });

  it('Default', async () => {
    await expect(page).toMatch(/Apples/);
    await percySnapshot(page, 'Radio');
  });
});
