import percySnapshot from '@percy/puppeteer';

describe('SelectField', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/select-field`);
  });

  it('Default', async () => {
    await expect(page).toMatch('State');
    await percySnapshot(page, 'SelectField');
  });
});
