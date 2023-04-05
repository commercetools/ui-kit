import percySnapshot from '@percy/puppeteer';

describe('NumberField', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/number-field`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/Age');
    await percySnapshot(page, 'NumberField');
  });
});
