import { percySnapshot } from '@percy/puppeteer';
import { widths } from '../../../../test/percy/widths';

describe('MoneyField', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/money-field');
  });

  it('MoneyField', async () => {
    await expect(page).toMatch('Price');
    await percySnapshot(page, 'MoneyField', { widths });
  });
});
