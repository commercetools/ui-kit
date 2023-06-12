import percySnapshot from '@percy/puppeteer';

describe('CheckBoxField', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/checkbox-field`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/Welcome Text');
    await percySnapshot(page, 'CheckBoxField');
  });
});
