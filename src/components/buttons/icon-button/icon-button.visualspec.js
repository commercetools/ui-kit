import { percySnapshot } from '@percy/puppeteer';
import { widths } from '../../../../test/percy/widths';

describe('IconButton', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/icon-button');
  });

  it('IconButton', async () => {
    await expect(page).toMatch('A label text');
    await percySnapshot(page, 'IconButton', { widths });
  });
});
