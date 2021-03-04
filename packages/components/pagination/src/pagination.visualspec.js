import percySnapshot from '@percy/puppeteer';

describe('Pagination', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/pagination`);
  });

  it('Default', async () => {
    await expect(page).toMatch('');
    await percySnapshot(page, 'Pagination');
  });
});
