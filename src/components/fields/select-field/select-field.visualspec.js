import { percySnapshot } from '@percy/puppeteer';

describe('SelectField', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/select-field');
  });

  it('Default', async () => {
    await expect(page).toMatch('State');
    await percySnapshot(page, 'SelectField');
  });
});
