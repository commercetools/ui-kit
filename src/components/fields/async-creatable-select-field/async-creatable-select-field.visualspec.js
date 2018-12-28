import { percySnapshot } from '@percy/puppeteer';
import { widths } from '../../../../test/percy/widths';

describe('AsyncCreatableSelectField', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/async-creatable-select-field');
  });

  it('AsyncCreatableSelectField', async () => {
    await expect(page).toMatch('State');
    await percySnapshot(page, 'AsyncCreatableSelectField', { widths });
  });
});
