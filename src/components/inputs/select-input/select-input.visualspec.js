import { percySnapshot } from '@percy/puppeteer';

describe('SelectInput', () => {
  it('Default', async () => {
    await page.goto(`${HOST}/select-input`);
    await expect(page).toMatch('minimal');
    await percySnapshot(page, 'SelectInput');
  });

  it('Open', async () => {
    await page.goto(`${HOST}/select-input-open`);
    await page.click('#select-input');
    await expect(page).toMatch('One');
    await percySnapshot(page, 'SelectInput - open');
  });
});
