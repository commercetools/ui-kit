import { percySnapshot } from '@percy/puppeteer';
import { widths } from '../../../../test/percy/widths';

describe('NumberInput', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/number-input');
  });

  it('NumberInput', async () => {
    await expect(page).toMatch('minimal');
    await percySnapshot(page, 'NumberInput', { widths });
  });
});
