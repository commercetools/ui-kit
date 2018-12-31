import { percySnapshot } from '@percy/puppeteer';

describe('Label', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/label');
  });

  it('Default', async () => {
    await expect(page).toMatch('Hello');
    await percySnapshot(page, 'Label');
  });
});
