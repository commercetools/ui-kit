import percySnapshot from '@percy/puppeteer';

describe('FlatButton', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/flat-button`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/A label text');
    await percySnapshot(page, 'FlatButton');
  });
});
