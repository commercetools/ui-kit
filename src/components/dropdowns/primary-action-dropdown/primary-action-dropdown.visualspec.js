import { percySnapshot } from '@percy/puppeteer';
import { widths } from '../../../../test/percy/widths';

describe('PrimaryActionDropdown', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/primary-action-dropdown');
  });

  it('PrimaryActionDropdown', async () => {
    await expect(page).toMatch('Primary option');
    await percySnapshot(page, 'PrimaryActionDropdown', { widths });
  });
});
