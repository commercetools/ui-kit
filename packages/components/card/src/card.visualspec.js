import percySnapshot from '@percy/puppeteer';

describe('Card', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/card`);
  });

  it('Default', async () => {
    await expect(page).toMatch(/InsetScale/);
    await percySnapshot(page, 'Card');
  });
});
