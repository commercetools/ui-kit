import percySnapshot from '@percy/puppeteer';

describe('NumberInput', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/number-input`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/minimal');
    await percySnapshot(page, 'NumberInput');
  });
});
