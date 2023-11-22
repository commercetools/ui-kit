import percySnapshot from '@percy/puppeteer';

describe('Radio', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/radio-input`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/Apples');
    await percySnapshot(page, 'Radio');
  });
});
