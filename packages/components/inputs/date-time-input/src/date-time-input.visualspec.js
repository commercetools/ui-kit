import percySnapshot from '@percy/puppeteer';

describe('DateTimeInput', () => {
  it('Default', async () => {
    await page.goto(`${globalThis.HOST}/date-time-input`);
    await page.waitForSelector('text/minimal');
    await percySnapshot(page, 'DateTimeInput');
  });
  it('Open', async () => {
    await page.goto(`${globalThis.HOST}/date-time-input-open`);
    await page.click('#date-time-input');
    await page.waitForSelector('text/November');
    // TODO: uncomment when issue with Percy is resolved
    // await percySnapshot(page, 'DateTimeInput - open');
  });
  it('Filter Appearance', async () => {
    await page.goto(`${globalThis.HOST}/date-time-input--filter-appearance`);
    await page.waitForSelector('text/November');
    await percySnapshot(page, 'DateTimeInput - Filter Appearance');
  });
});
