import percySnapshot from '@percy/puppeteer';

describe('Constraints.Horizontal', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/constraints-horizontal`);
  });

  it('Default', async () => {
    await expect(page).toMatch('when max is 1');
    await percySnapshot(page, 'Constraints.Horizontal');
  });
});
