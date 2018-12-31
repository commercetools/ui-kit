import { percySnapshot } from '@percy/puppeteer';

describe('TimeField', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/time-field`);
  });

  it('Default', async () => {
    await expect(page).toMatch('Release Time');
    await percySnapshot(page, 'TimeField');
  });
});
