import { percySnapshot } from '@percy/puppeteer';
import { widths } from '../../../test/percy/widths';

describe('Messages', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/messages');
  });

  it('Messages', async () => {
    await expect(page).toMatch('An error message');
    await percySnapshot(page, 'Messages', { widths });
  });
});
