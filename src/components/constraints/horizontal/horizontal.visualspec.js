import { percySnapshot } from '@percy/puppeteer';

describe('Constraints.Horizontal', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/constraints-horizontal');
  });

  it('Constraints.Horizontal', async () => {
    await expect(page).toMatch('when constraints is "xs"');
    await percySnapshot(page, 'Constraints.Horizontal');
  });
});
