import percySnapshot from '@percy/puppeteer';

describe('CheckboxField', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/checkbox-field`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/Welcome Text');
    await percySnapshot(page, 'CheckboxField');
  });
});
