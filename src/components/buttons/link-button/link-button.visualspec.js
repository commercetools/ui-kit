import { percySnapshot } from '@percy/puppeteer';
import { widths } from '../../../../test/percy/widths';

describe('LinkButton', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/link-button');
  });

  it('LinkButton', async () => {
    await expect(page).toMatch('A label text');
    await percySnapshot(page, 'LinkButton', { widths });
  });
});
