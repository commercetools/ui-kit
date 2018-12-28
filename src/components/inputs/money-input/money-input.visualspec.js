import { percySnapshot } from '@percy/puppeteer';
import { widths } from '../../../../test/percy/widths';

describe('MoneyInput', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/money-input');
  });

  it('MoneyInput', async () => {
    await expect(page).toMatch('minimal');
    await percySnapshot(page, 'MoneyInput', { widths });
  });
});
