import percySnapshot from '@percy/puppeteer';
import { getDocument, queries } from 'pptr-testing-library';

describe('AsyncCreatableSelectField', () => {
  it('Default', async () => {
    await page.goto(`${globalThis.HOST}/async-creatable-select-field`);
    const doc = await getDocument(page);
    const select = await queries.findAllByLabelText(doc, 'State');
    await expect(select).toBeTruthy();
    await percySnapshot(page, 'AsyncCreatableSelectField');
  });
  describe('with defaultOptions', () => {
    it('When open', async () => {
      await page.goto(
        `${globalThis.HOST}/async-creatable-select-field/interaction`
      );
      const doc = await getDocument(page);
      const selects = await queries.findAllByLabelText(doc, 'State');
      const select = selects[0];
      await select.click();
      // TODO: uncomment when issue with Percy is resolved
      // await percySnapshot(page, 'AsyncCreatableSelectField - Open');
    });
  });
  describe('without defaultOptions', () => {
    it('When open', async () => {
      await page.goto(
        `${globalThis.HOST}/async-creatable-select-field/interaction/without-default-options`
      );
      const doc = await getDocument(page);
      const selects = await queries.findAllByLabelText(doc, 'State');
      const select = selects[0];
      await select.click();
      // TODO: uncomment when issue with Percy is resolved
      /* await percySnapshot(
        page,
        'AsyncCreatableSelectField - withDefaultOptions disabled - open'
      ); */
      // typing triggers async loadOptions
      await select.type('Three');
      // TODO: uncomment when issue with Percy is resolved
      /* await percySnapshot(
        page,
        'AsyncCreatableSelectField - withDefaultOptions disabled - open - after typing'
      ); */
    });
  });
});
