import { percySnapshot } from '@percy/puppeteer';

describe('TextInput', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3001/text-input');
  });

  it('Default', async () => {
    await expect(page).toMatch('hello world how are you');
    await percySnapshot(page, 'TextInput');
  });
});
