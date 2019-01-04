import { percySnapshot } from '@percy/puppeteer';

describe('AsyncCreatableSelectField', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/async-creatable-select-field`);
  });

  it('AsyncCreatableSelectField', async () => {
    await expect(page).toMatch('State');
    await percySnapshot(page, 'AsyncCreatableSelectField');
  });
});
