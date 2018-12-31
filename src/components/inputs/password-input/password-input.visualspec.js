import { percySnapshot } from '@percy/puppeteer';

describe('PasswordInput', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/password-input');
  });

  it('Default', async () => {
    await expect(page).toMatch('minimal');
    await percySnapshot(page, 'PasswordInput');
  });
});
