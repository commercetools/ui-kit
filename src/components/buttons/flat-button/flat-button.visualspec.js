import { percySnapshot } from '@percy/puppeteer';
import { widths } from '../../../../test/percy/widths';

describe('FlatButton', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/flat-button');
  });

  it('FlatButton', async () => {
    await expect(page).toMatch('A label text');
    await percySnapshot(page, 'FlatButton', { widths });
  });
});
