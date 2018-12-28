import { percySnapshot } from '@percy/puppeteer';
import { widths } from '../../../test/percy/widths';

describe('Avatar', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/avatar');
  });

  it('Avatar', async () => {
    await expect(page).toMatch('when gravatar hash is known');
    await percySnapshot(page, 'Avatar', { widths });
  });
});
