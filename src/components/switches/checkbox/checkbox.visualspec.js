import { percySnapshot } from '@percy/puppeteer';

describe('Checkbox', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/checkbox`);
  });

  it('Checkbox', async () => {
    await expect(page).toMatch('when default');
    await percySnapshot(page, 'Checkbox');
  });
});
