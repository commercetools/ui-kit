import { percySnapshot } from '@percy/puppeteer';
import { widths } from '../../../../test/percy/widths';

describe('CollapsiblePanel', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/collapsible-panel');
  });

  it('CollapsiblePanel', async () => {
    await expect(page).toMatch('condensed');
    await percySnapshot(page, 'CollapsiblePanel', { widths });
  });
});
