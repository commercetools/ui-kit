import { percySnapshot } from '@percy/puppeteer';
import { widths } from '../../../../test/percy/widths';

describe('LocalizedTextInput', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/localized-text-input');
  });

  it('LocalizedTextInput', async () => {
    await expect(page).toMatch('hello world');
    await percySnapshot(page, 'LocalizedTextInput', { widths });
  });
});
