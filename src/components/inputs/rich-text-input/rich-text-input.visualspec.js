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

  it('Interactive', async () => {
    await page.goto(`${HOST}/rich-text-input/interactive`);
    const doc = await getDocument(page);
    const input = await getByLabelText(doc, 'Rich text');

    // make the text bold
    const boldButton = await getByLabelText(doc, 'Bold');
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
    const italicButton = await getByLabelText(doc, 'Italic');
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
    const underlineButton = await getByLabelText(doc, 'Underline');
    await underlineButton.click();

    // check there are italic tags in the document.
    numOfTags = await getNumberOfTags('u');
    expect(numOfTags).toEqual(1);

    await wait(() => getByText(doc, 'Underlined text!'));

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
    await percySnapshot(page, 'RichTextInput - more styles menu open');

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

    const undoButton = await getByLabelText(doc, 'Undo');
    await undoButton.click();

    // bold should be removed
    numOfTags = await getNumberOfTags('strong');
    expect(numOfTags).toEqual(0);

    // now we can try redoing it
    const redoButton = await getByLabelText(doc, 'Redo');
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

    /* Testing Blocks */

    // start by removing all the text
    await selectAllText(input);
    await input.press('Backspace');

    // next, open the Style menu

    const styleMenuButton = await getByLabelText(doc, 'Style');
    await styleMenuButton.click();

    await wait(() => getByText(doc, 'Headline H1'));
    await percySnapshot(page, 'RichTextInput - style menu open');

    // then click on the H1 button
    const h1Button = await getByText(doc, 'Headline H1');
    await h1Button.click();

    // now type into the input
    const h1Text = 'here is our first h1';
    await input.type(h1Text);

    // text we typed should be visible on the screen
    await wait(() => getByText(doc, h1Text));

    // h1 should be in document
    numOfTags = await getNumberOfTags('h1');
    expect(numOfTags).toEqual(1);

    // now, let's change back to h3
    await selectAllText(input);

    // open style menu again
    await styleMenuButton.click();

    // then click on the H1 button
    const h3Button = await getByText(doc, 'Headline H3');
    await h3Button.click();

    // h1 should not be in document
    numOfTags = await getNumberOfTags('h1');
    expect(numOfTags).toEqual(0);

    // h3 should be in document
    numOfTags = await getNumberOfTags('h3');
    expect(numOfTags).toEqual(1);

    // now change back to paragraph (the default)

    // open style menu again
    await styleMenuButton.click();

    // then click on the paragraph button
    const paragraphbutton = await getByText(doc, 'Paragraph');
    await paragraphbutton.click();

    // h3 should not be in document
    numOfTags = await getNumberOfTags('h3');
    expect(numOfTags).toEqual(0);

    // working with lists.

    // start by removing all the text
    await selectAllText(input);
    await input.press('Backspace');
    // get and click unordered list button
    const unorderedListButton = await getByLabelText(doc, 'Unordered list');
    await unorderedListButton.click();

    await input.type('Item 1');
    await input.press('Enter');
    await input.type('Item 2');

    // ul should be in the document
    numOfTags = await getNumberOfTags('ul');
    expect(numOfTags).toEqual(1);

    // two li tags should be in the document

    numOfTags = await getNumberOfTags('li');
    expect(numOfTags).toEqual(2);

    // now switch to an ordered list

    await selectAllText(input);
    const orderedListButton = await getByLabelText(doc, 'Ordered list');
    await orderedListButton.click();

    // ul should not be in the document
    numOfTags = await getNumberOfTags('ul');
    expect(numOfTags).toEqual(0);

    // ol should not be in the document
    numOfTags = await getNumberOfTags('ol');
    expect(numOfTags).toEqual(1);

    // two li tags should still be in the document

    numOfTags = await getNumberOfTags('li');
    expect(numOfTags).toEqual(2);

    // remove all the text
    await selectAllText(input);
    await input.press('Backspace');

    const resetButton = await getByLabelText(doc, 'Reset value to Hello World');
    await resetButton.click();

    // 1 strong tag should be in the document

    numOfTags = await getNumberOfTags('strong');
    expect(numOfTags).toEqual(1);

    await wait(() => getByText(doc, 'Hello World'));

    // remove bold from text
    await selectAllText(input);
    await boldButton.click();

    numOfTags = await getNumberOfTags('strong');
    expect(numOfTags).toEqual(0);

    await input.press('Backspace');

    await input.type('Okay dokey');
    await wait(() => getByText(doc, 'Okay dokey'));
  });
});
