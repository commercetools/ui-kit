import percySnapshot from '@percy/puppeteer';

describe('PasswordInput', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/password-input`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/minimal');
    await percySnapshot(page, 'PasswordInput');
  });
});
