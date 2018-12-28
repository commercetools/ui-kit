import { percySnapshot } from '@percy/puppeteer';
import { widths } from '../../../../test/percy/widths';

describe('TimeField', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/time-field');
  });

  it('TimeField', async () => {
    await expect(page).toMatch('Release Time');
    await percySnapshot(page, 'TimeField', { widths });
  });
});
