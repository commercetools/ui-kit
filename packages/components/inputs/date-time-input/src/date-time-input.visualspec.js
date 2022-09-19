import percySnapshot from '@percy/puppeteer';

describe('DateTimeInput', () => {
  it('Default', async () => {
    await page.goto(`${globalThis.HOST}/date-time-input`);
    await expect(page).toMatch('minimal');
    await percySnapshot(page, 'DateTimeInput');
  });
  it('Open', async () => {
    await page.goto(`${globalThis.HOST}/date-time-input-open`);
    await page.click('#date-time-input');
    await expect(page).toMatch('November');
    await percySnapshot(page, 'DateTimeInput - open');
  });
});
