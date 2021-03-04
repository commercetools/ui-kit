import percySnapshot from '@percy/puppeteer';

describe('MultilineTextField', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/multiline-text-field`);
  });

  it('MultilineTextField', async () => {
    await expect(page).toMatch('Welcome Text');
    await percySnapshot(page, 'MultilineTextField');
  });
});
