import { percySnapshot } from '@percy/puppeteer';
import { widths } from '../../../../test/percy/widths';

describe('Text', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/text');
  });

  it('Text', async () => {
    await expect(page).toMatch('Headline - h1');
    await percySnapshot(page, 'Text', { widths });
  });
});
