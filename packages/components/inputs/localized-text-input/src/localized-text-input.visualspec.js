import percySnapshot from '@percy/puppeteer';

describe('LocalizedTextInput', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/localized-text-input`);
  });

  it('Default', async () => {
    await expect(page).toMatch('hello world');
    await percySnapshot(page, 'LocalizedTextInput');
  });
});
