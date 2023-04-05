import percySnapshot from '@percy/puppeteer';

describe('DateRangeField', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/date-range-field`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/Discounted days');
    await percySnapshot(page, 'DateRangeField');
  });
});
