import { percySnapshot } from '@percy/puppeteer';

describe('Text', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/text`);
  });

  it('Default', async () => {
    await expect(page).toMatch('Headline - h1');
    await percySnapshot(page, 'Text');
  });
});
