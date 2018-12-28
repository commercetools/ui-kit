import { percySnapshot } from '@percy/puppeteer';
import { widths } from '../../../test/percy/widths';

describe('Label', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/label');
  });

  it('Label', async () => {
    await expect(page).toMatch('Hello');
    await percySnapshot(page, 'Label', { widths });
  });
});
