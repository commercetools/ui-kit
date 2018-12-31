import { percySnapshot } from '@percy/puppeteer';

describe('LocalizedMultilineTextField', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/localized-multiline-text-field');
  });

  it('Default', async () => {
    await expect(page).toMatch('Welcome Text');
    await percySnapshot(page, 'LocalizedMultilineTextField');
  });
});
