import { percySnapshot } from '@percy/puppeteer';

describe('LocalizedTextField', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/localized-text-field`);
  });

  it('Default', async () => {
    await expect(page).toMatch('Welcome Text');
    await percySnapshot(page, 'LocalizedTextField');
  });
});
