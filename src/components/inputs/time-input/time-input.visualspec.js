import { percySnapshot } from '@percy/puppeteer';
import { widths } from '../../../../test/percy/widths';

describe('TimeInput', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/time-input');
  });

  it('TimeInput', async () => {
    await expect(page).toMatch('minimal');
    await percySnapshot(page, 'TimeInput', { widths });
  });
});
