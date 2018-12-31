import { percySnapshot } from '@percy/puppeteer';

describe('LinkButton', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/link-button');
  });

  it('Default', async () => {
    await expect(page).toMatch('A label text');
    await percySnapshot(page, 'LinkButton');
  });
});
