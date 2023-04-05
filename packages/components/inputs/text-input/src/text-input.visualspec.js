import percySnapshot from '@percy/puppeteer';

describe('TextInput', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/text-input`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/hello world how are you');
    await percySnapshot(page, 'TextInput');
  });
});
