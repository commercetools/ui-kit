import { percySnapshot } from '@percy/puppeteer';

describe('TextField', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/text-field`);
  });

  it('Default', async () => {
    await expect(page).toMatch('Welcome Text');
    await percySnapshot(page, 'TextField');
  });
});
