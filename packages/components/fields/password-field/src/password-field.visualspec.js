import percySnapshot from '@percy/puppeteer';

describe('PasswordField', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/password-field`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/Welcome Text');
    await percySnapshot(page, 'PasswordField');
  });
});
