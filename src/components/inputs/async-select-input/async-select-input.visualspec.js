import { percySnapshot } from '@percy/puppeteer';

describe('AsyncSelectInput', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/async-select-input`);
  });

  it('Default', async () => {
    await expect(page).toMatch('minimal');
    await percySnapshot(page, 'AsyncSelectInput');
  });
});
