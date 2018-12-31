import { percySnapshot } from '@percy/puppeteer';

describe('Radio', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/radio');
  });

  it('Default', async () => {
    await expect(page).toMatch('Apples');
    await percySnapshot(page, 'Radio');
  });
});
