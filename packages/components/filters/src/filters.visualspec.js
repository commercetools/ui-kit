import percySnapshot from '@percy/puppeteer';
import { getDocument, queries } from 'pptr-testing-library';

describe('FiltersList', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/filters`);
  });

  it.skip('Default', async () => {
    // THIS IS A STUB
  });
});
