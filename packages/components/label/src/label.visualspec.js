import percySnapshot from '@percy/puppeteer';

describe('Label', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/label`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/Hello');
    await percySnapshot(page, 'Label');
  });
});
