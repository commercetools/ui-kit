import { percySnapshot } from '@percy/puppeteer';

describe('Avatar', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/avatar`);
  });

  it('Default', async () => {
    await expect(page).toMatch('when gravatar hash is known');
    await percySnapshot(page, 'Avatar');
  });
});
