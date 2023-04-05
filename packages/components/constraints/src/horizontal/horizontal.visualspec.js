import percySnapshot from '@percy/puppeteer';

describe('Constraints.Horizontal', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/constraints-horizontal`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/when max is 1');
    await percySnapshot(page, 'Constraints.Horizontal');
  });
});
