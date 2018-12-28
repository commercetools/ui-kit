import { percySnapshot } from '@percy/puppeteer';
import { widths } from '../../../../test/percy/widths';

describe('DateField', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/date-field');
  });

  it('DateField', async () => {
    await expect(page).toMatch('Release Date');
    await percySnapshot(page, 'DateField', { widths });
  });
});
