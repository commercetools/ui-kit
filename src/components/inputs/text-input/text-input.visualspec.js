import { percySnapshot } from '@percy/puppeteer';
import { widths } from '../../../../test/percy/widths';

describe('TextInput', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/text-input');
  });

  it('TextInput', async () => {
    await expect(page).toMatch('hello world how are you');
    await percySnapshot(page, 'TextInput', { widths });
  });
});
