import { percySnapshot } from '@percy/puppeteer';

describe('Text', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/text');
  });

  it('Default', async () => {
    await expect(page).toMatch('Headline - h1');
    await percySnapshot(page, 'Text');
  });
});
