import { percySnapshot } from '@percy/puppeteer';
import { widths } from '../../../../test/percy/widths';

describe('AsyncSelectInput', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/async-select-input');
  });

  it('AsyncSelectInput', async () => {
    await expect(page).toMatch('minimal');
    await percySnapshot(page, 'AsyncSelectInput', { widths });
  });
});
