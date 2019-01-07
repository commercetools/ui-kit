import { percySnapshot } from '@percy/puppeteer';

describe('LocalizedMoneyInput', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/localized-money-input`);
  });

  it('Default', async () => {
    await expect(page).toMatch('minimal');
    await percySnapshot(page, 'LocalizedMoneyInput');
  });
});
