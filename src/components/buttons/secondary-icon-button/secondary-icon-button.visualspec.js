import { percySnapshot } from '@percy/puppeteer';
import { widths } from '../../../../test/percy/widths';

describe('SecondaryIconButton', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/secondary-icon-button');
  });

  it('SecondaryIconButton', async () => {
    await expect(page).toMatch('A label text');
    await percySnapshot(page, 'SecondaryIconButton', { widths });
  });
});
