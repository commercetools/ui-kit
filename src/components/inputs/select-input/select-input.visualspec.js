import { percySnapshot } from '@percy/puppeteer';

describe('SelectInput', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/select-input');
  });

  it('Default', async () => {
    await expect(page).toMatch('minimal');
    await percySnapshot(page, 'SelectInput');
  });
});
