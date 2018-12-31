import { percySnapshot } from '@percy/puppeteer';

describe('PasswordField', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/password-field`);
  });

  it('Default', async () => {
    await expect(page).toMatch('Welcome Text');
    await percySnapshot(page, 'PasswordField');
  });
});
