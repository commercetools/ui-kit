import percySnapshot from '@percy/puppeteer';

describe('ProgressBar', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/progress-bar`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/when label is a string');
    await percySnapshot(page, 'ProgressBar');
  });
});
