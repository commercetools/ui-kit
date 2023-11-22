import percySnapshot from '@percy/puppeteer';
import { getDocument, queries } from 'pptr-testing-library';

describe('AsyncCreatableSelectInput', () => {
  it('Default', async () => {
    await page.goto(`${globalThis.HOST}/async-creatable-select-input`);
    await page.waitForSelector('text/minimal');
    await percySnapshot(page, 'AsyncCreatableSelectInput');
  });

  it('Open', async () => {
    await page.goto(`${globalThis.HOST}/async-creatable-select-input-open`);
    const doc = await getDocument(page);
    const select = await queries.findByText(doc, 'One');
    await select.click();
    // typing triggers async loadOptions
    await select.type('Two');
    // TODO: uncomment when issue with Percy is resolved
    // await percySnapshot(page, 'AsyncCreatableSelectInput - open after typing');
  });
});
