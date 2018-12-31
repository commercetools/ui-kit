import { percySnapshot } from '@percy/puppeteer';

describe('MultilineTextInput', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/multiline-text-input');
  });

  it('Default', async () => {
    await expect(page).toMatch('minimal');
    await percySnapshot(page, 'MultilineTextInput');
  });
});
