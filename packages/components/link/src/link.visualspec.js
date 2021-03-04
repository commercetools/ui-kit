import percySnapshot from '@percy/puppeteer';

describe('Link', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/link`);
  });

  it('Default', async () => {
    await expect(page).toMatch('A label text');
    await percySnapshot(page, 'Link');
  });
});
