import percySnapshot from '@percy/puppeteer';
import { getDocument, queries } from 'pptr-testing-library';

describe('SearchSelectField', () => {
  it('Default', async () => {
    await page.goto(`${globalThis.HOST}/search-select-field`);
    const doc = await getDocument(page);
    const selects = await queries.findAllByLabelText(doc, 'State');
    await expect(selects).toBeTruthy();
    await percySnapshot(page, 'SearchSelectField');
  });

  it('Open', async () => {
    await page.goto(`${globalThis.HOST}/search-select-field`);
    const doc = await getDocument(page);
    const selects = await queries.findAllByLabelText(doc, 'State');
    const select = selects[0];
    await select.click();
    // TODO: uncomment when issue with Percy is resolved
    // await percySnapshot(page, 'SearchSelectField - open');
  });
});
