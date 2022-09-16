import percySnapshot from '@percy/puppeteer';

describe('DateTimeField', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/date-time-field`);
  });

  it('Default', async () => {
    await expect(page).toMatch('Release Date');
    await percySnapshot(page, 'DateTimeField');
  });
});
