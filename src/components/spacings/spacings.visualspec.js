import { percySnapshot } from '@percy/puppeteer';
import { widths } from '../../../test/percy/widths';

describe('Spacings', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/spacings');
  });

  it('Spacings', async () => {
    await expect(page).toMatch('Inset');
    await percySnapshot(page, 'Spacings', { widths });
  });
});
