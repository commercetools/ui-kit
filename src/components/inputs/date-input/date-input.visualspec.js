import { percySnapshot } from '@percy/puppeteer';

describe('DateInput', () => {
  it('Default', async () => {
    await page.goto('http://localhost:3001/date-input');
    await expect(page).toMatch('minimal');
    await percySnapshot(page, 'DateInput');
  });
  it('Open', async () => {
    await page.goto('http://localhost:3001/date-input-open');
    await page.click('#date-input');
    await expect(page).toMatch('November');
    await percySnapshot(page, 'DateInput - open');
  });
});
