import { percySnapshot } from '@percy/puppeteer';
import { getDocument, queries, wait } from 'pptr-testing-library';

const { getByLabelText, getByText } = queries;

describe('RichTextInput', () => {
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
    await page.goto(`${HOST}/rich-text-input`);
    await expect(page).toMatch('minimal');
    await percySnapshot(page, 'RichTextInput');
  });

  it('Interactive - with marks', async () => {
    await page.goto(`${HOST}/rich-text-input/interactive`);
    const doc = await getDocument(page);
    const input = await getByLabelText(doc, 'Rich text');

    // make the text bold
    const boldButton = await getByLabelText(doc, 'bold');
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

    await input.type('Italic text!');

    await wait(() => getByText(doc, 'Italic text!'));

    await selectAllText(input);

    // make the selection italic
    const italicButton = await getByLabelText(doc, 'italic');
    await italicButton.click();

    // check there are italic tags in the document.
    numOfTags = await getNumberOfTags('em');
    expect(numOfTags).toEqual(1);

    // click italic button to remove it
    await italicButton.click();

    // check that the italic tags have been removed.
    numOfTags = await getNumberOfTags('em');
    expect(numOfTags).toEqual(0);

    await selectAllText(input);
    await input.press('Backspace');
    await input.type('Underlined text!');

    await wait(() => getByText(doc, 'Underlined text!'));

    await selectAllText(input);

    // make the selection underlined
    const underlineButton = await getByLabelText(doc, 'underlined');
    await underlineButton.click();

    // check there are italic tags in the document.
    numOfTags = await getNumberOfTags('u');
    expect(numOfTags).toEqual(1);

    // click italic button to remove it
    await underlineButton.click();

    // check that the italic tags have been removed.
    numOfTags = await getNumberOfTags('u');
    expect(numOfTags).toEqual(0);

    // multi select marks

    // Strike through
    await selectAllText(input);
    await input.press('Backspace');

    await input.type('Strike through?!');
    await wait(() => getByText(doc, 'Strike through?!'));

    await selectAllText(input);

    const moreStylesButton = await getByLabelText(doc, 'More styles');
    await moreStylesButton.click();

    await wait(() => getByText(doc, 'Strikethrough'));

    let strikethroughButton = await getByText(doc, 'Strikethrough');
    await strikethroughButton.click();

    // check there are del tags in the document.
    numOfTags = await getNumberOfTags('del');
    expect(numOfTags).toEqual(1);

    // remove the mark
    await moreStylesButton.click();

    await wait(() => getByText(doc, 'Strikethrough'));

    strikethroughButton = await getByText(doc, 'Strikethrough');
    await strikethroughButton.click();

    // check there are del tags in the document.
    numOfTags = await getNumberOfTags('del');
    expect(numOfTags).toEqual(0);

    await selectAllText(input);
    await input.press('Backspace');

    await input.type('Superscript!');
    await wait(() => getByText(doc, 'Superscript!'));

    await selectAllText(input);

    await moreStylesButton.click();

    await wait(() => getByText(doc, 'Superscript'));

    let superscriptButton = await getByText(doc, 'Superscript');
    await superscriptButton.click();

    // check there are sup tags in the document.
    numOfTags = await getNumberOfTags('sup');
    expect(numOfTags).toEqual(1);

    // remove the mark
    await moreStylesButton.click();

    await wait(() => getByText(doc, 'Superscript'));
    superscriptButton = await getByText(doc, 'Superscript');
    await superscriptButton.click();

    // check there are no del tags in the document.
    numOfTags = await getNumberOfTags('sup');
    expect(numOfTags).toEqual(0);

    // apply subscript to the selection

    await moreStylesButton.click();
    let subscriptButton = await getByText(doc, 'Subscript');

    await subscriptButton.click();

    // check there are sub tags in the document.
    numOfTags = await getNumberOfTags('sub');
    expect(numOfTags).toEqual(1);

    // remove subscript now

    await moreStylesButton.click();
    subscriptButton = await getByText(doc, 'Subscript');
    await subscriptButton.click();

    // check there are no sub tags in the document.
    numOfTags = await getNumberOfTags('sub');
    expect(numOfTags).toEqual(0);

    /* UNDO & REDO FUNCTIONALITY TESTING */

    /* with marks */

    // start by removing all values
    await selectAllText(input);
    await input.press('Backspace');

    await input.type('Let us now test undo!');
    await wait(() => getByText(doc, 'Let us now test undo!'));

    // apply bold to selection.
    await selectAllText(input);
    await boldButton.click();

    // bold should be applied
    numOfTags = await getNumberOfTags('strong');
    expect(numOfTags).toEqual(1);

    const undoButton = await getByLabelText(doc, 'undo');
    await undoButton.click();

    // bold should be removed
    numOfTags = await getNumberOfTags('strong');
    expect(numOfTags).toEqual(0);

    // now we can try redoing it
    const redoButton = await getByLabelText(doc, 'redo');
    await redoButton.click();

    // bold should be added again
    numOfTags = await getNumberOfTags('strong');
    expect(numOfTags).toEqual(1);

    /* with text */

    // start by removing all the text
    await selectAllText(input);
    await input.press('Backspace');

    // then click undo, text should be back

    await undoButton.click();
    await wait(() => getByText(doc, 'Let us now test undo!'));
  });
});
