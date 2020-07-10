import { percySnapshot } from '@percy/puppeteer';

describe('MultilineTextInput', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/multiline-text-input`);
  });

  it('Default', async () => {
    await expect(page).toMatch('minimal');
    await percySnapshot(page, 'MultilineTextInput');
  });
});
