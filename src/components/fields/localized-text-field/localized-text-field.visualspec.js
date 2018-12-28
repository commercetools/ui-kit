import { percySnapshot } from '@percy/puppeteer';
import { widths } from '../../../../test/percy/widths';

describe('LocalizedTextField', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/localized-text-field');
  });

  it('LocalizedTextField', async () => {
    await expect(page).toMatch('Welcome Text');
    await percySnapshot(page, 'LocalizedTextField', { widths });
  });
});
