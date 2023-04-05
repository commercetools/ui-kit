import percySnapshot from '@percy/puppeteer';

describe('MultilineTextField', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/multiline-text-field`);
  });

  it('MultilineTextField', async () => {
    await page.waitForSelector('text/Welcome Text');
    await percySnapshot(page, 'MultilineTextField');
  });
});
