import { percySnapshot } from '@percy/puppeteer';

describe('Checkbox', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/checkbox');
  });

  it('Checkbox', async () => {
    await expect(page).toMatch('when default');
    await percySnapshot(page, 'Checkbox');
  });
});
