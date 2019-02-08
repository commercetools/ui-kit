import { percySnapshot } from '@percy/puppeteer';

describe('SelectInput', () => {
  it('Default', async () => {
    await page.goto(`${HOST}/select-input`);
    await expect(page).toMatch('minimal');
    await percySnapshot(page, 'SelectInput');
  });

  it('Open', async () => {
    await page.goto(`${HOST}/select-input-open`);
    await page.click('#select-input-1');
    await expect(page).toMatch('One');
    await percySnapshot(page, 'SelectInput - open - without option groups');
    await page.click('#select-input-2');
    await percySnapshot(
      page,
      'SelectInput - open - option group with no divider'
    );
    await page.click('#select-input-3');
    await percySnapshot(
      page,
      'SelectInput - open - options groups with divider'
    );
  });
});
