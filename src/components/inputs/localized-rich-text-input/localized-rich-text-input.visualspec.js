import { percySnapshot } from '@percy/puppeteer';

describe('LocalizedRichTextInput', () => {
  it('Default', async () => {
    await page.goto(`${HOST}/localized-rich-text-input`);
    await expect(page).toMatch('minimal');
    await percySnapshot(page, 'LocalizedRichTextInput');
  });
});
