import { percySnapshot } from '@percy/puppeteer';
import { widths } from '../../../../test/percy/widths';

describe('LocalizedMultilineTextInput', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/localized-multiline-text-input');
  });

  it('LocalizedMultilineTextInput', async () => {
    await expect(page).toMatch('minimal');
    await percySnapshot(page, 'LocalizedMultilineTextInput', { widths });
  });
});
