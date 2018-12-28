import { percySnapshot } from '@percy/puppeteer';
import { widths } from '../../../../test/percy/widths';

describe('Toggle', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/toggle');
  });

  it('Toggle', async () => {
    await expect(page).toMatch('Default');
    await percySnapshot(page, 'Toggle', { widths });
  });
});
