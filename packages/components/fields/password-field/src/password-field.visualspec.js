import percySnapshot from '@percy/puppeteer';

describe('PasswordField', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/password-field`);
  });

  it('Default', async () => {
    await expect(page).toMatch('Welcome Text');
    await percySnapshot(page, 'PasswordField');
  });
});
