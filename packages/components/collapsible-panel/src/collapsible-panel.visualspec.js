import percySnapshot from '@percy/puppeteer';

describe('CollapsiblePanel', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/collapsible-panel`);
  });

  it('Default', async () => {
    await expect(page).toMatch('condensed');
    await percySnapshot(page, 'CollapsiblePanel');
  });
});
