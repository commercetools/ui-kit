import { percySnapshot } from '@percy/puppeteer';
import { widths } from '../../../../test/percy/widths';

describe('AsyncSelectField', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/async-select-field');
  });

  it('AsyncSelectField', async () => {
    await expect(page).toMatch('State');
    await percySnapshot(page, 'AsyncSelectField', { widths });
  });
});
