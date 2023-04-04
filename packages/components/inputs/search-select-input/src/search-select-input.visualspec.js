import percySnapshot from '@percy/puppeteer';
import { getDocument, queries } from 'pptr-testing-library';

describe('SearchSelectInput', () => {
  it('Default', async () => {
    await page.goto(`${globalThis.HOST}/search-select-input`);
    await page.waitForSelector('text/minimal');
    await percySnapshot(page, 'SearchSelectInput');
  });

  it('Open', async () => {
    await page.goto(`${globalThis.HOST}/search-select-input-open`);
    const doc = await getDocument(page);
    const select = await queries.findByText(doc, 'One');
    await select.click();
    // typing triggers async loadOptions
    await select.type('Two');
    // TODO: uncomment when issue with Percy is resolved
    // await percySnapshot(page, 'SearchSelectInput - open');
  });
});
