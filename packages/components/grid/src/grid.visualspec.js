import percySnapshot from '@percy/puppeteer';

describe('Grid', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/grid`);
  });

  it('Default', async () => {
    await expect(page).toMatch('1');
    await percySnapshot(page, 'Grid');
  });
});
