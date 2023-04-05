import percySnapshot from '@percy/puppeteer';

describe('TimeInput', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/time-input`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/minimal');
    await percySnapshot(page, 'TimeInput');
  });
});
