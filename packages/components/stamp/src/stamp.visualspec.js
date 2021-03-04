import percySnapshot from '@percy/puppeteer';

describe('Stamp', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/stamp`);
  });

  it('Default', async () => {
    await expect(page).toMatch('when critical');
    await percySnapshot(page, 'Stamp');
  });
});
