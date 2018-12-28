import { percySnapshot } from '@percy/puppeteer';
import { widths } from '../../../../test/percy/widths';

describe('AsyncCreatableSelectInput', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/async-creatable-select-input');
  });

  it('AsyncCreatableSelectInput', async () => {
    await expect(page).toMatch('minimal');
    await percySnapshot(page, 'AsyncCreatableSelectInput', { widths });
  });
});
