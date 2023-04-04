import percySnapshot from '@percy/puppeteer';

describe('SelectField', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/select-field`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/State');
    await percySnapshot(page, 'SelectField');
  });
});
