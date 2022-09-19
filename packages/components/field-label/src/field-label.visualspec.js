import percySnapshot from '@percy/puppeteer';

describe('FieldLabel', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/field-label`);
  });

  it('Default', async () => {
    await expect(page).toMatch('Hello');
    await percySnapshot(page, 'FieldLabel');
  });
});
