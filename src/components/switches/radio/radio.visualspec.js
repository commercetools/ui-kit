import { percySnapshot } from '@percy/puppeteer';
import { widths } from '../../../../test/percy/widths';

describe('Radio', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/radio');
  });

  it('Radio', async () => {
    await expect(page).toMatch('Apples');
    await percySnapshot(page, 'Radio', { widths });
  });
});
