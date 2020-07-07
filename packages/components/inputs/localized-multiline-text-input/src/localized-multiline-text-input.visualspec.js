import { percySnapshot } from '@percy/puppeteer';

describe('LocalizedMultilineTextInput', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/localized-multiline-text-input`);
  });

  it('Default', async () => {
    await expect(page).toMatch('minimal');
    await percySnapshot(page, 'LocalizedMultilineTextInput');
  });
});
