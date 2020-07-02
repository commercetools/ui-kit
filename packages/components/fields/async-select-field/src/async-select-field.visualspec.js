import { percySnapshot } from '@percy/puppeteer';
import { getDocument, queries } from 'pptr-testing-library';

const { getAllByLabelText } = queries;

describe('AsyncSelectField', () => {
  it('Default', async () => {
    await page.goto(`${HOST}/async-select-field`);
    const doc = await getDocument(page);
    const selects = await getAllByLabelText(doc, 'State');
    await expect(selects).toBeTruthy();
    await percySnapshot(page, 'AsyncSelectField');
  });

  describe('with defaultOptions', () => {
    it('Open', async () => {
      await page.goto(`${HOST}/async-select-field/interaction`);
      const doc = await getDocument(page);
      const selects = await getAllByLabelText(doc, 'State');
      const select = selects[0];
      await select.click();
      await percySnapshot(page, 'AsyncSelectField - withDefaultOptions - open');
    });
  });

  describe('without defaultOptions', () => {
    it('Open', async () => {
      await page.goto(
        `${HOST}/async-select-field/interaction/without-default-options`
      );
      const doc = await getDocument(page);
      const selects = await getAllByLabelText(doc, 'State');
      const select = selects[0];
      await select.click();
      await percySnapshot(
        page,
        'AsyncSelectField - withDefaultOptions disabled - open'
      );
      // typing triggers async loadOptions
      await select.type('O');
      await percySnapshot(
        page,
        'AsyncSelectField - withDefaultOptions disabled - open - after typing'
      );
    });
  });
});
