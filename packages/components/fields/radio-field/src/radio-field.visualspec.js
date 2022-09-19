import percySnapshot from '@percy/puppeteer';

describe('RadioField', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/radio-field`);
  });

  it('Default', async () => {
    await expect(page).toMatch('Welcome Text');
    await percySnapshot(page, 'RadioField');
  });
});
