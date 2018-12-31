import { percySnapshot } from '@percy/puppeteer';

describe('Tag', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/tag');
  });

  it('Default', async () => {
    await expect(page).toMatch('Normal');
    await percySnapshot(page, 'Tag');
  });
});
