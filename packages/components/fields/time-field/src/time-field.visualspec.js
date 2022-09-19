import percySnapshot from '@percy/puppeteer';

describe('TimeField', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/time-field`);
  });

  it('Default', async () => {
    await expect(page).toMatch('Release Time');
    await percySnapshot(page, 'TimeField');
  });
});
