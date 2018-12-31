import { percySnapshot } from '@percy/puppeteer';

describe('TimeInput', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/time-input');
  });

  it('Default', async () => {
    await expect(page).toMatch('minimal');
    await percySnapshot(page, 'TimeInput');
  });
});
