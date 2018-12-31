import { percySnapshot } from '@percy/puppeteer';

describe('TextField', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/text-field');
  });

  it('Default', async () => {
    await expect(page).toMatch('Welcome Text');
    await percySnapshot(page, 'TextField');
  });
});
