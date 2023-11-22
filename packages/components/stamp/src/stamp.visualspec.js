import percySnapshot from '@percy/puppeteer';

describe('Stamp', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/stamp`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/when critical');
    await percySnapshot(page, 'Stamp');
  });
});
