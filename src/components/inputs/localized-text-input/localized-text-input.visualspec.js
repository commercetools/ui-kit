import { percySnapshot } from '@percy/puppeteer';

describe('LocalizedTextInput', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/localized-text-input');
  });

  it('Default', async () => {
    await expect(page).toMatch('hello world');
    await percySnapshot(page, 'LocalizedTextInput');
  });
});
