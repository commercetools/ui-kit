import { percySnapshot } from '@percy/puppeteer';

describe('Tooltip', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/tooltip`);
  });

  it('Default', async () => {
    await expect(page).toMatch('Closed');
    await percySnapshot(page, 'Tooltip');
  });
});
