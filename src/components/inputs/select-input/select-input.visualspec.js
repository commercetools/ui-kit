import { percySnapshot } from '@percy/puppeteer';
import { widths } from '../../../../test/percy/widths';

describe('SelectInput', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/select-input');
  });

  it('SelectInput', async () => {
    await expect(page).toMatch('minimal');
    await percySnapshot(page, 'SelectInput', { widths });
  });
});
