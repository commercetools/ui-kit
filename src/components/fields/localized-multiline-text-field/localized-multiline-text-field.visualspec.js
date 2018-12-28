import { percySnapshot } from '@percy/puppeteer';
import { widths } from '../../../../test/percy/widths';

describe('LocalizedMultilineTextField', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/localized-multiline-text-field');
  });

  it('LocalizedMultilineTextField', async () => {
    await expect(page).toMatch('Welcome Text');
    await percySnapshot(page, 'LocalizedMultilineTextField', { widths });
  });
});
