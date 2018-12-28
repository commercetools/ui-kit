import { percySnapshot } from '@percy/puppeteer';
import { widths } from '../../../../test/percy/widths';

describe('SecondaryButton', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/secondary-button');
  });

  it('SecondaryButton', async () => {
    await expect(page).toMatch('A label text');
    await percySnapshot(page, 'SecondaryButton', { widths });
  });
});
