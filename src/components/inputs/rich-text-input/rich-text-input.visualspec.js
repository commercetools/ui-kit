import { percySnapshot } from '@percy/puppeteer';

describe('RichTextInput', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/rich-text-input`);
  });

  it('Default', async () => {
    await expect(page).toMatch('minimal');
    await percySnapshot(page, 'RichTextInput');
  });
});
