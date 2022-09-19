import percySnapshot from '@percy/puppeteer';

describe('Tag', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/tag`);
  });

  it('Default', async () => {
    await expect(page).toMatch('Normal');
    await percySnapshot(page, 'Tag');
  });
});
