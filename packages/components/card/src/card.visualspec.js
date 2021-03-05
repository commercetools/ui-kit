import percySnapshot from '@percy/puppeteer';

describe('Card', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/card`);
  });

  it('Default', async () => {
    await expect(page).toMatch('Type - Raised, Theme - Light, Padding - M');
    await percySnapshot(page, 'Card');
  });
});
