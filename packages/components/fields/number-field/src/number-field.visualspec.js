import percySnapshot from '@percy/puppeteer';

describe('NumberField', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/number-field`);
  });

  it('Default', async () => {
    await expect(page).toMatch('Age');
    await percySnapshot(page, 'NumberField');
  });
});
