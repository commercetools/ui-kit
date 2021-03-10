import percySnapshot from '@percy/puppeteer';

describe('Card', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/card`);
  });

  it('Default', async () => {
    await expect(page).toMatch(/InsetScale/);
    await percySnapshot(page, 'Card');
  });
});
