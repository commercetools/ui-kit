import percySnapshot from '@percy/puppeteer';

describe('DateField', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/date-field`);
  });

  it('DateField', async () => {
    await page.waitForSelector('text/Release Date');
    await percySnapshot(page, 'DateField');
  });
});
