import { percySnapshot } from '@percy/puppeteer';

describe('DateTimeIpnut', () => {
  it('Default', async () => {
    await page.goto('http://localhost:3001/date-time-input');
    await expect(page).toMatch('minimal');
    await percySnapshot(page, 'DateTimeInput');
  });
  it('Open', async () => {
    await page.goto('http://localhost:3001/date-time-input-open');
    await page.click('#date-time-input');
    await expect(page).toMatch('November');
    await percySnapshot(page, 'DateTimeInput - open');
  });
});
