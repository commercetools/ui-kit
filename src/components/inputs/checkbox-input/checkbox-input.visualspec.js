import { percySnapshot } from '@percy/puppeteer';

describe('CheckboxInput', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/checkbox-input`);
  });

  it('CheckboxInput', async () => {
    await expect(page).toMatch('when default');
    await percySnapshot(page, 'Checkbox');
  });
});
