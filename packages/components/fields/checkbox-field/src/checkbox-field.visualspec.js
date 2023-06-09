import percySnapshot from '@percy/puppeteer';

describe('CheckBoxField', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/checkbox-field`);
  });

  it('Default', async () => {
    await expect(page).toMatch('Welcome Text');
    await percySnapshot(page, 'CheckBoxField');
  });
});
