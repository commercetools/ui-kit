import percySnapshot from '@percy/puppeteer';

describe('DataTable', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/data-table`);
  });

  it('Default', async () => {
    await expect(page).toMatch('default');
    await percySnapshot(page, 'DataTable');
  });
});
