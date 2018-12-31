import { percySnapshot } from '@percy/puppeteer';

describe('Spacings', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/spacings');
  });

  it('Default', async () => {
    await expect(page).toMatch('Inset');
    await percySnapshot(page, 'Spacings');
  });
});
