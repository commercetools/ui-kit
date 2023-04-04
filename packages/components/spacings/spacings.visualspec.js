import percySnapshot from '@percy/puppeteer';

describe('Spacings', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/spacings`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/Inset');
    await percySnapshot(page, 'Spacings');
  });
});
