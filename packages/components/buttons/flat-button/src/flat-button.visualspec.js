import percySnapshot from '@percy/puppeteer';

describe('FlatButton', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/flat-button`);
  });

  it('Default', async () => {
    await expect(page).toMatch('A label text');
    await percySnapshot(page, 'FlatButton');
  });
});
