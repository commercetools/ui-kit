import { percySnapshot } from '@percy/puppeteer';
import { widths } from '../../../test/percy/widths';

describe('Tag', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/tag');
  });

  it('Tag', async () => {
    await expect(page).toMatch('Normal');
    await percySnapshot(page, 'Tag', { widths });
  });
});
