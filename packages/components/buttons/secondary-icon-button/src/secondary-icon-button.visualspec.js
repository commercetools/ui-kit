import percySnapshot from '@percy/puppeteer';

describe('SecondaryIconButton', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/secondary-icon-button`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/A label text');
    await percySnapshot(page, 'SecondaryIconButton');
  });
});
