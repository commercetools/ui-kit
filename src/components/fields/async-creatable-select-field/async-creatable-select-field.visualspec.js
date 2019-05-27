import { percySnapshot } from '@percy/puppeteer';
import { getDocument, queries } from 'pptr-testing-library';

const { getAllByLabelText } = queries;

describe('AsyncCreatableSelectField', () => {
  it('Default', async () => {
    await page.goto(`${HOST}/async-creatable-select-field`);
    const doc = await getDocument(page);
    const select = await getAllByLabelText(doc, 'State');
    await expect(select).toBeTruthy();
    await percySnapshot(page, 'AsyncCreatableSelectField');
  });
  describe('with defaultOptions', () => {
    it('When open', async () => {
      await page.goto(`${HOST}/async-creatable-select-field/interaction`);
      const doc = await getDocument(page);
      const selects = await getAllByLabelText(doc, 'State');
      const select = selects[0];
      await select.click();
      await percySnapshot(page, 'AsyncCreatableSelectField - Open');
    });
  });
  describe('without defaultOptions', () => {
    it('When open', async () => {
      await page.goto(
        `${HOST}/async-creatable-select-field/interaction/without-default-options`
      );
      const doc = await getDocument(page);
      const selects = await getAllByLabelText(doc, 'State');
      const select = selects[0];
      await select.click();
      await percySnapshot(
        page,
        'AsyncCreatableSelectField - withDefaultOptions disabled - open'
      );
      // typing triggers async loadOptions
      await select.type('Three');
      await percySnapshot(
        page,
        'AsyncCreatableSelectField - withDefaultOptions disabled - open - after typing'
      );
    });
  });
});
