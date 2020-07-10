import { percySnapshot } from '@percy/puppeteer';

describe('CreatableSelectInput', () => {
  it('CreatableSelectInput', async () => {
    await page.goto('http://localhost:3001/creatable-select-input');
    await expect(page).toMatch('minimal');
    await percySnapshot(page, 'CreatableSelectInput');
  });

  it('Open', async () => {
    await page.goto(`${HOST}/creatable-select-input-open`);
    await page.click('#creatable-select-input');
    await expect(page).toMatch('One');
    await percySnapshot(page, 'CreatableSelectInput - open');
  });
});
