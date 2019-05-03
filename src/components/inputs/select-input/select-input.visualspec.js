import { percySnapshot } from '@percy/puppeteer';

describe('SelectInput', () => {
  it('Default', async () => {
    await page.goto(`${HOST}/select-input`);
    await expect(page).toMatch('minimal');
    await percySnapshot(page, 'SelectInput');
  });

  it('Open', async () => {
    await page.goto(`${HOST}/select-input/open`);
    await page.click('#select-input');
    await expect(page).toMatch('One');
    await percySnapshot(page, 'SelectInput - open - without option groups');
  });
  it('Open - dark', async () => {
    await page.goto(`${HOST}/select-input/open-dark`);
    await page.click('#select-input');
    await expect(page).toMatch('One');
    await percySnapshot(page, 'SelectInput - open - with custom (dark) theme');
  });
  it('Open with option groups', async () => {
    await page.goto(`${HOST}/select-input/open-with-option-groups`);
    await page.click('#select-input');
    await percySnapshot(
      page,
      'SelectInput - open - option group with no divider'
    );
  });
  it('Open with option groups and divider', async () => {
    await page.goto(`${HOST}/select-input/open-with-option-groups-and-divider`);
    await page.click('#select-input');
    await percySnapshot(page, 'SelectInput - open - option group with divider');
  });
});
