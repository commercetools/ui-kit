import { percySnapshot } from '@percy/puppeteer';

describe('AsyncSelectField', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/async-select-field`);
  });

  it('Default', async () => {
    await expect(page).toMatch('State');
    await percySnapshot(page, 'AsyncSelectField');
  });
});
