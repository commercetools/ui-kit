import { percySnapshot } from '@percy/puppeteer';

describe('PasswordField', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/password-field');
  });

  it('PasswordField', async () => {
    await expect(page).toMatch('Welcome Text');
    await percySnapshot(page, 'PasswordField');
  });
});
