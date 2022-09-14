import percySnapshot from '@percy/puppeteer';

describe('CreatableSelectInput', () => {
  it('CreatableSelectInput', async () => {
    await page.goto(`${HOST}/creatable-select-input`);
    await expect(page).toMatch('minimal');
    await percySnapshot(page, 'CreatableSelectInput');
  });

  it('Open', async () => {
    await page.goto(`${HOST}/creatable-select-input-open`);
    await page.click('#creatable-select-input');
    await expect(page).toMatch('One');
    // TODO: uncomment when issue with Percy is resolved
    // await percySnapshot(page, 'CreatableSelectInput - open');
  });
});
