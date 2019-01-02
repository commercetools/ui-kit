import { percySnapshot } from '@percy/puppeteer';

describe('Label', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/label`);
  });

  it('Default', async () => {
    await expect(page).toMatch('Hello');
    await percySnapshot(page, 'Label');
  });
});
