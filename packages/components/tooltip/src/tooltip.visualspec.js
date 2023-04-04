import percySnapshot from '@percy/puppeteer';

describe('Tooltip', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/tooltip`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/Closed');
    await percySnapshot(page, 'Tooltip');
  });
});
