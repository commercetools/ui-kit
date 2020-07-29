import { percySnapshot } from '@percy/puppeteer';

describe('DataTableManager', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/data-table-manager`);
  });

  it('Default', async () => {
    await expect(page).toMatch('default');
    await percySnapshot(page, 'DataTableManager');
  });
});
