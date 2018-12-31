import { percySnapshot } from '@percy/puppeteer';

describe('DateRangeField', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/date-range-field');
  });

  it('Default', async () => {
    await expect(page).toMatch('Discounted days');
    await percySnapshot(page, 'DateRangeField');
  });
});
