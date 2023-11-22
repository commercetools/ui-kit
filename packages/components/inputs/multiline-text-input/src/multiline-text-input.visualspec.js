import percySnapshot from '@percy/puppeteer';

describe('MultilineTextInput', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/multiline-text-input`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/minimal');
    await percySnapshot(page, 'MultilineTextInput');
  });
});
