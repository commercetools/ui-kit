import { percySnapshot } from '@percy/puppeteer';
import { widths } from '../../../../test/percy/widths';

describe('NumberField', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/number-field');
  });

  it('NumberField', async () => {
    await expect(page).toMatch('Age');
    await percySnapshot(page, 'NumberField', { widths });
  });
});
