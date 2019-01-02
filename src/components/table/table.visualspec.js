import { percySnapshot } from '@percy/puppeteer';

describe('Table', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/table`);
  });

  it('Default', async () => {
    await expect(page).toMatch('Basic example');
    await percySnapshot(page, 'Table');
  });
});
