import { percySnapshot } from '@percy/puppeteer';

describe('CreatableSelectInput', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/creatable-select-input');
  });

  it('CreatableSelectInput', async () => {
    await expect(page).toMatch('minimal');
    await percySnapshot(page, 'CreatableSelectInput');
  });
});
