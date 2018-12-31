import { percySnapshot } from '@percy/puppeteer';

describe('AsyncCreatableSelectInput', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/async-creatable-select-input`);
  });

  it('Default', async () => {
    await expect(page).toMatch('minimal');
    await percySnapshot(page, 'AsyncCreatableSelectInput');
  });
});
