import { percySnapshot } from '@percy/puppeteer';

describe('AsyncCreatableSelectField', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/async-creatable-select-field');
  });

  it('AsyncCreatableSelectField', async () => {
    await expect(page).toMatch('State');
    await percySnapshot(page, 'AsyncCreatableSelectField');
  });
});
