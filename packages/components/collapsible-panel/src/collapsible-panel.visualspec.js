import percySnapshot from '@percy/puppeteer';

describe('CollapsiblePanel', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/collapsible-panel`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/condensed');
    await percySnapshot(page, 'CollapsiblePanel');
  });
});
