import percySnapshot from '@percy/puppeteer';

describe('CreatableSelectInput', () => {
  it('CreatableSelectInput', async () => {
    await page.goto(`${globalThis.HOST}/creatable-select-input`);
    await page.waitForSelector('text/minimal');
    await percySnapshot(page, 'CreatableSelectInput');
  });

  it('Open', async () => {
    await page.goto(`${globalThis.HOST}/creatable-select-input-open`);
    await page.click('#creatable-select-input');
    await page.waitForSelector('text/One');
    // TODO: uncomment when issue with Percy is resolved
    // await percySnapshot(page, 'CreatableSelectInput - open');
  });
});
