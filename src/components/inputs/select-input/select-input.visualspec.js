import { percySnapshot } from '@percy/puppeteer';

describe('SelectInput', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/select-input`);
  });

  it('Default', async () => {
    await expect(page).toMatch('minimal');
    await percySnapshot(page, 'SelectInput');
  });
});
