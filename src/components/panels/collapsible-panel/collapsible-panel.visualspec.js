import { percySnapshot } from '@percy/puppeteer';

describe('CollapsiblePanel', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/collapsible-panel');
  });

  it('Default', async () => {
    await expect(page).toMatch('condensed');
    await percySnapshot(page, 'CollapsiblePanel');
  });
});
