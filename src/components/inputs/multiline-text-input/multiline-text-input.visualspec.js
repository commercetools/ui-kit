import { percySnapshot } from '@percy/puppeteer';
import { widths } from '../../../../test/percy/widths';

describe('MultilineTextInput', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/multiline-text-input');
  });

  it('MultilineTextInput', async () => {
    await expect(page).toMatch('minimal');
    await percySnapshot(page, 'MultilineTextInput', { widths });
  });
});
