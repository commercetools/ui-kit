import percySnapshot from '@percy/puppeteer';

describe('Card', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/card`);
  });

  it('Default', async () => {
    await expect(page).toMatch('Type - Raised, Theme - Light, InsetSpace - M');
    await percySnapshot(page, 'Card');
  });
});
