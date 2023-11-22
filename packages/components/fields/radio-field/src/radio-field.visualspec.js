import percySnapshot from '@percy/puppeteer';

describe('RadioField', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/radio-field`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/Welcome Text');
    await percySnapshot(page, 'RadioField');
  });
});
