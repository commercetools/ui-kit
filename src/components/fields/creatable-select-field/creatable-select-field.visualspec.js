import { percySnapshot } from '@percy/puppeteer';
import { widths } from '../../../../test/percy/widths';

describe('CreatableSelectField', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/creatable-select-field');
  });

  it('CreatableSelectField', async () => {
    await expect(page).toMatch('State');
    await percySnapshot(page, 'CreatableSelectField', { widths });
  });
});
