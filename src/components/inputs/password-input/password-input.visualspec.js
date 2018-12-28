import { percySnapshot } from '@percy/puppeteer';
import { widths } from '../../../../test/percy/widths';

describe('PasswordInput', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/password-input');
  });

  it('PasswordInput', async () => {
    await expect(page).toMatch('minimal');
    await percySnapshot(page, 'PasswordInput', { widths });
  });
});
