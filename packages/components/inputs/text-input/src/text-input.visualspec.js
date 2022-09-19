import percySnapshot from '@percy/puppeteer';

describe('TextInput', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/text-input`);
  });

  it('Default', async () => {
    await expect(page).toMatch('hello world how are you');
    await percySnapshot(page, 'TextInput');
  });
});
