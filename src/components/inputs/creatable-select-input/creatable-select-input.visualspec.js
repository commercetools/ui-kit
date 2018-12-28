import { percySnapshot } from '@percy/puppeteer';
import { widths } from '../../../../test/percy/widths';

describe('CreatableSelectInput', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/creatable-select-input');
  });

  it('CreatableSelectInput', async () => {
    await expect(page).toMatch('minimal');
    await percySnapshot(page, 'CreatableSelectInput', { widths });
  });
});
