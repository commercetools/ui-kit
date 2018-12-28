import { percySnapshot } from '@percy/puppeteer';
import { widths } from '../../../test/percy/widths';

describe('Stamp', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/stamp');
  });

  it('Stamp', async () => {
    await expect(page).toMatch('when critical');
    await percySnapshot(page, 'Stamp', { widths });
  });
});
