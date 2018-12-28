import { percySnapshot } from '@percy/puppeteer';
import { widths } from '../../../../test/percy/widths';

describe('MultilineTextField', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/multiline-text-field');
  });

  it('MultilineTextField', async () => {
    await expect(page).toMatch('Welcome Text');
    await percySnapshot(page, 'MultilineTextField', { widths });
  });
});
