import { percySnapshot } from '@percy/puppeteer';
import { widths } from '../../../test/percy/widths';

describe('FieldLabel', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/field-label');
  });

  it('FieldLabel', async () => {
    await expect(page).toMatch('Hello');
    await percySnapshot(page, 'FieldLabel', { widths });
  });
});
