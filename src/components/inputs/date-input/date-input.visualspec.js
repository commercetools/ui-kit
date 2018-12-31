import { percySnapshot } from '@percy/puppeteer';

describe('DateInput', () => {
  it('Default', async () => {
    await page.goto(`${HOST}/date-input`);
    await expect(page).toMatch('minimal');
    await percySnapshot(page, 'DateInput');
  });
  it('Open', async () => {
    await page.goto(`${HOST}/date-input-open`);
    await page.click('#date-input');
    await expect(page).toMatch('November');
    await percySnapshot(page, 'DateInput - open');
  });
});
