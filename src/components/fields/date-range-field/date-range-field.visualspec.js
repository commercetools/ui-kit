import { percySnapshot } from '@percy/puppeteer';
import { widths } from '../../../../test/percy/widths';

describe('DateRangeField', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/date-range-field');
  });

  it('DateRangeField', async () => {
    await expect(page).toMatch('Discounted days');
    await percySnapshot(page, 'DateRangeField', { widths });
  });
});
