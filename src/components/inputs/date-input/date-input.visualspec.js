import { percySnapshot } from '@percy/puppeteer';
import { widths } from '../../../../test/percy/widths';

describe('DateInput', () => {
  it('Default', async () => {
    await page.goto('http://localhost:3001/date-input');
    await expect(page).toMatch('minimal');
    await percySnapshot(page, 'DateInput', { widths });
  });
  it('Open', async () => {
    await page.goto('http://localhost:3001/date-input-open');
    await page.click('#date-input');
    await expect(page).toMatch('November');
    await percySnapshot(page, 'DateInput - open', { widths });
  });
});
