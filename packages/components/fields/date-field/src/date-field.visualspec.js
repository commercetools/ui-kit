import percySnapshot from '@percy/puppeteer';

describe('DateField', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/date-field`);
  });

  it('DateField', async () => {
    await expect(page).toMatch('Release Date');
    await percySnapshot(page, 'DateField');
  });
});
