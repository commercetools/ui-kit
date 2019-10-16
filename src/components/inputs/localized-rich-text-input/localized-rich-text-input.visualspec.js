import { percySnapshot } from '@percy/puppeteer';
import { getDocument, queries, wait } from 'pptr-testing-library';

const { getByLabelText, getAllByLabelText, getByText } = queries;

describe('LocalizedRichTextInput', () => {
  const selectAllText = async input => {
    // eslint-disable-next-line no-shadow
    await page.evaluate(input => {
      const range = document.createRange();
      range.selectNodeContents(input);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }, input);
  };

  const getNumberOfTags = async tagName => {
    // eslint-disable-next-line no-shadow
    const numberOfTags = await page.evaluate(tagName => {
      return document.querySelectorAll(tagName).length;
    }, tagName);

    return numberOfTags;
  };

  it('Default', async () => {
    await page.goto(`${HOST}/localized-rich-text-input`);
    await expect(page).toMatch('minimal');
    await percySnapshot(page, 'LocalizedRichTextInput');
  });

  it('Interactive', async () => {
    await page.goto(`${HOST}/localized-rich-text-input/interactive`);
    const doc = await getDocument(page);
    let input = await getByLabelText(doc, 'EN');

    // make the text bold
    let boldButton = await getByLabelText(doc, 'Bold');
    await boldButton.click();

    await input.type('Hello world');
    await wait(() => getByText(doc, 'Hello world'));

    // check that there is now a strong tag in the document.
    let numOfTags = await getNumberOfTags('strong');

    expect(numOfTags).toEqual(1);

    // select the text
    await selectAllText(input);
    // click the bold button again
    await boldButton.click();

    // check there are no strong tags in the document.
    numOfTags = await getNumberOfTags('strong');
    expect(numOfTags).toEqual(0);

    await input.press('Backspace');

    const expandButton = await getByLabelText(doc, 'Show all languages (2)');
    await expandButton.click();

    const boldButtons = await getAllByLabelText(doc, 'Bold');
    // there should be three bold buttons (3 inputs open)
    expect(boldButtons.length).toBe(3);

    // switch to german input
    input = await getByLabelText(doc, 'DE');

    boldButton = boldButtons[1];

    await boldButton.click();

    await input.type('Hello world');

    // check that there is now a strong tag in the document.
    numOfTags = await getNumberOfTags('strong');
  });
});
