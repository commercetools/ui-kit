import { percySnapshot } from '@percy/puppeteer';
import { getDocument, queries } from 'pptr-testing-library';

const { getByLabelText } = queries;

describe('AsyncCreatableSelectField', () => {
  it('Default', async () => {
    await page.goto(`${HOST}/async-creatable-select-field`);
    const doc = await getDocument(page);
    const select = await getByLabelText(doc, 'State');
    await expect(select).toBeTruthy();
    await percySnapshot(page, 'AsyncCreatableSelectField');
  });
  describe('with defaultOptions', () => {
    it('When open', async () => {
      await page.goto(`${HOST}/async-creatable-select-field/interaction`);
      const doc = await getDocument(page);
      const select = await getByLabelText(doc, 'State');
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
      const select = await getByLabelText(doc, 'State');
      await select.click();
      await percySnapshot(
        page,
        'AsyncCreatableSelectField - withDefaultOptions disabled - open'
      );
      // typing triggers async loadOptions
      await select.type(' ');
      await percySnapshot(
        page,
        'AsyncCreatableSelectField - withDefaultOptions disabled - open - after typing'
      );
    });
  });
});
