import { percySnapshot } from '@percy/puppeteer';

describe('MoneyInput', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/money-input');
  });

  it('Default', async () => {
    await expect(page).toMatch('minimal');
    await percySnapshot(page, 'MoneyInput');
  });
});
