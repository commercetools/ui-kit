import { percySnapshot } from '@percy/puppeteer';
import { widths } from '../../../../test/percy/widths';

describe('SelectField', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/select-field');
  });

  it('SelectField', async () => {
    await expect(page).toMatch('State');
    await percySnapshot(page, 'SelectField', { widths });
  });
});
