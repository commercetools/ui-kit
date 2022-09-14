import percySnapshot from '@percy/puppeteer';

describe('DateTimeInput', () => {
  it('Default', async () => {
    await page.goto(`${HOST}/date-time-input`);
    await expect(page).toMatch('minimal');
    await percySnapshot(page, 'DateTimeInput');
  });
  it('Open', async () => {
    await page.goto(`${HOST}/date-time-input-open`);
    await page.click('#date-time-input');
    await expect(page).toMatch('November');
    // TODO: uncomment when issue with Percy is resolved
    // await percySnapshot(page, 'DateTimeInput - open');
  });
});
