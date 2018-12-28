import { percySnapshot } from '@percy/puppeteer';
import { widths } from '../../../../test/percy/widths';

describe('DateTimeField', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/date-time-field');
  });

  it('DateTimeField', async () => {
    await expect(page).toMatch('Release Date');
    await percySnapshot(page, 'DateTimeField', { widths });
  });
});
