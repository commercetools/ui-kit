import { percySnapshot } from '@percy/puppeteer';
import { widths } from '../../../../test/percy/widths';

describe('TextField', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/text-field');
  });

  it('TextField', async () => {
    await expect(page).toMatch('Welcome Text');
    await percySnapshot(page, 'TextField', { widths });
  });
});
