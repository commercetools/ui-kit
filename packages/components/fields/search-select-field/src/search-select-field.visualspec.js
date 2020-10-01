import { percySnapshot } from '@percy/puppeteer';
import { getDocument, queries } from 'pptr-testing-library';

const { getAllByLabelText } = queries;

describe('SearchSelectField', () => {
  it('Default', async () => {
    await page.goto(`${HOST}/search-select-field`);
    const doc = await getDocument(page);
    const selects = await getAllByLabelText(doc, 'State');
    await expect(selects).toBeTruthy();
    await percySnapshot(page, 'SearchSelectField');
  });

  it('Open', async () => {
    await page.goto(`${HOST}/search-select-field-open`);
    const doc = await getDocument(page);
    const selects = await getAllByLabelText(doc, 'State');
    const select = selects[0];
    await select.click();
    await percySnapshot(page, 'SearchSelectField - open');
  });
});
