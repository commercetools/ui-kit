import percySnapshot from '@percy/puppeteer';
import { getDocument, queries } from 'pptr-testing-library';

describe('FilterMenu', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/filter-menu`);
  });

  it.skip('Default', async () => {
    // THIS IS A STUB
  });
});