import { percySnapshot } from '@percy/puppeteer';

describe('FlatButton', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/flat-button');
  });

  it('Default', async () => {
    await expect(page).toMatch('A label text');
    await percySnapshot(page, 'FlatButton');
  });
});
