import { percySnapshot } from '@percy/puppeteer';

describe('NumberInput', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/number-input');
  });

  it('Default', async () => {
    await expect(page).toMatch('minimal');
    await percySnapshot(page, 'NumberInput');
  });
});
