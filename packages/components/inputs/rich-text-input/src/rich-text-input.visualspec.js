// import percySnapshot from '@percy/puppeteer';
import puppeteer from 'puppeteer';
import { getDocument, queries } from 'pptr-testing-library';
let browser;
let page;

jest.setTimeout(20000);

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: 'new',
    slowMo: 10, // Launching the browser in slow motion is necessary due to race conditions. Otherwise browser closes prematurely and tests fail.
  });
  page = await browser.newPage();
});
afterEach(async () => {
  await browser.close();
});

describe('RichTextInput', () => {
  const blur = async (element) => {
    // eslint-disable-next-line no-shadow
    await page.evaluate((element) => {
      element.blur();
    }, element);
  };
  const selectAllText = async (input) => {
    // eslint-disable-next-line no-shadow
    await page.evaluate((input) => {
      const range = document.createRange();
      range.selectNodeContents(input);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }, input);
  };

  const waitForNumberOfTags = (tagName, count) => {
    return page.waitForFunction(
      (_tagName, _count) => {
        return document.querySelectorAll(_tagName).length === _count;
      },
      { timeout: 10000 },
      tagName,
      count
    );
  };

  it('Default', async () => {
    await page.goto(`${globalThis.HOST}/rich-text-input`);
    await page.waitForSelector('text/minimal');
    // TODO: uncomment when issue with Percy is resolved
    // await percySnapshot(page, 'RichTextInput');
  });

  describe('Interactive', () => {
    it('apply bold, italic, underline, strikethrough, superscript, subscript', async () => {
      await page.goto(`${globalThis.HOST}/rich-text-input/interactive`);
      const doc = await getDocument(page);
      const input = await queries.findByTestId(doc, 'rich-text');

      await selectAllText(input);
      await input.press('Backspace');

      // make the text bold
      const boldButton = await queries.findByLabelText(doc, 'Bold');
      await boldButton.click();

      await input.type('Hello world');
      await queries.findByText(doc, 'Hello world');

      // check that there is now a strong tag in the document.
      await waitForNumberOfTags('strong', 1);

      // select the text
      await selectAllText(input);
      // click the bold button again
      await boldButton.click();

      // check there are no strong tags in the document.
      await waitForNumberOfTags('strong', 0);

      await input.press('Backspace');

      await input.type('Italic text!');

      await queries.findByText(doc, 'Italic text!');

      await selectAllText(input);

      // make the selection italic
      const italicButton = await queries.findByLabelText(doc, 'Italic');
      await italicButton.click();

      // check there are italic tags in the document.
      await waitForNumberOfTags('em', 1);

      // click italic button to remove it
      await italicButton.click();

      // check that the italic tags have been removed.
      await waitForNumberOfTags('em', 0);

      await selectAllText(input);
      await input.press('Backspace');
      await input.type('Underlined text!');

      await queries.findByText(doc, 'Underlined text!');

      await selectAllText(input);

      // make the selection underlined
      const underlineButton = await queries.findByLabelText(doc, 'Underline');
      await underlineButton.click();

      // check there are italic tags in the document.
      await waitForNumberOfTags('u', 1);

      await queries.findByText(doc, 'Underlined text!');

      // click italic button to remove it
      await underlineButton.click();

      // check that the italic tags have been removed.
      await waitForNumberOfTags('u', 0);

      // multi select marks

      // Strike through
      await selectAllText(input);
      await input.press('Backspace');

      await input.type('Strike through?!');
      await queries.findByText(doc, 'Strike through?!');

      await selectAllText(input);

      const moreStylesButton = await queries.findByLabelText(
        doc,
        'More styles'
      );
      await moreStylesButton.click();

      await queries.findByText(doc, 'Strikethrough');
      // TODO: uncomment when issue with Percy is resolved
      // await percySnapshot(page, 'RichTextInput - more styles menu open');

      let strikethroughButton = await queries.findByText(doc, 'Strikethrough');
      await strikethroughButton.click();

      // check there are del tags in the document.
      await waitForNumberOfTags('del', 1);

      // remove the mark
      await moreStylesButton.click();

      await queries.findByText(doc, 'Strikethrough');

      strikethroughButton = await queries.findByText(doc, 'Strikethrough');
      await strikethroughButton.click();

      // check there are del tags in the document.
      await waitForNumberOfTags('del', 0);

      await selectAllText(input);
      await input.press('Backspace');

      await input.type('Superscript!');
      await queries.findByText(doc, 'Superscript!');

      await selectAllText(input);

      await moreStylesButton.click();

      await queries.findByText(doc, 'Superscript');

      let superscriptButton = await queries.findByText(doc, 'Superscript');
      await superscriptButton.click();

      // check there are sup tags in the document.
      await waitForNumberOfTags('sup', 1);

      // remove the mark
      await moreStylesButton.click();

      await queries.findByText(doc, 'Superscript');
      superscriptButton = await queries.findByText(doc, 'Superscript');
      await superscriptButton.click();

      // check there are no del tags in the document.
      await waitForNumberOfTags('sup', 0);

      // apply subscript to the selection

      await moreStylesButton.click();
      let subscriptButton = await queries.findByText(doc, 'Subscript');

      await subscriptButton.click();

      // check there are sub tags in the document.
      await waitForNumberOfTags('sub', 1);

      // remove subscript now

      await moreStylesButton.click();
      subscriptButton = await queries.findByText(doc, 'Subscript');
      await subscriptButton.click();

      // check there are no sub tags in the document.
      await waitForNumberOfTags('sub', 0);
    });

    it('undo and redo', async () => {
      await page.goto(`${globalThis.HOST}/rich-text-input/interactive`);
      const doc = await getDocument(page);
      const input = await queries.findByTestId(doc, 'rich-text');

      await selectAllText(input);
      await input.press('Backspace');

      // make the text bold
      const boldButton = await queries.findByLabelText(doc, 'Bold');

      await input.type('Let us now test undo!');
      await queries.findByText(doc, 'Let us now test undo!');

      // apply bold to selection.
      await selectAllText(input);
      await boldButton.click();

      // bold should be applied
      await waitForNumberOfTags('strong', 1);

      const undoButton = await queries.findByLabelText(doc, 'Undo');
      await undoButton.click();

      // bold should be removed
      await waitForNumberOfTags('strong', 0);

      // now we can try redoing it
      const redoButton = await queries.findByLabelText(doc, 'Redo');
      await redoButton.click();

      // bold should be added again
      await waitForNumberOfTags('strong', 1);

      /* with text */

      // start by removing all the text
      await selectAllText(input);
      await input.press('Backspace');

      // then click undo, text should be back

      await undoButton.click();
      await queries.findByText(doc, 'Let us now test undo!');
    });

    it('apply text styles', async () => {
      await page.goto(`${globalThis.HOST}/rich-text-input/interactive`);
      const doc = await getDocument(page);
      const input = await queries.findByTestId(doc, 'rich-text');

      await selectAllText(input);
      await input.press('Backspace');

      // next, open the Style menu
      // blur input first to test that editor focus works correctly
      await blur(input);

      const styleMenuButton = await queries.findByLabelText(doc, 'Style');
      await styleMenuButton.click();

      await queries.findByText(doc, 'Headline H1');
      // TODO: uncomment when issue with Percy is resolved
      // await percySnapshot(page, 'RichTextInput - style menu open');

      // then click on the H1 button
      const h1Button = await queries.findByText(doc, 'Headline H1');
      await h1Button.click();

      // now type into the input
      const h1Text = 'here is our first h1';
      await input.type(h1Text);

      // text we typed should be visible on the screen
      await queries.findByText(doc, h1Text);

      // h1 should be in document
      await waitForNumberOfTags('h1', 1);

      // now, let's change back to h3
      await selectAllText(input);

      // open style menu again
      await styleMenuButton.click();

      // then click on the H1 button
      const h3Button = await queries.findByText(doc, 'Headline H3');
      await h3Button.click();

      // h1 should not be in document
      await waitForNumberOfTags('h1', 0);

      // h3 should be in document
      await waitForNumberOfTags('h3', 1);

      // now change back to paragraph (the default)

      // blur input first to test that editor focus works correctly
      await blur(input);

      // open style menu again
      await styleMenuButton.click();

      // then click on the paragraph button
      const paragraphbutton = await queries.findByText(doc, 'Paragraph');
      await paragraphbutton.click();

      // h3 should not be in document
      await waitForNumberOfTags('h3', 0);
    });

    it('apply lists', async () => {
      await page.goto(`${globalThis.HOST}/rich-text-input/interactive`);
      const doc = await getDocument(page);
      const input = await queries.findByTestId(doc, 'rich-text');

      const resetButton = await queries.findByLabelText(
        doc,
        'Reset value to Hello World'
      );
      await resetButton.click();
      await selectAllText(input);
      await input.press('Backspace');

      // get and click unordered list button
      const unorderedListButton = await queries.findByLabelText(
        doc,
        'Bullet list'
      );
      await unorderedListButton.click();

      await input.type('Item 1');
      await input.press('Enter');
      await input.type('Item 2');

      // ul should be in the document
      await waitForNumberOfTags('ul', 1);

      // two li tags should be in the document
      await waitForNumberOfTags('li', 2);

      // now switch to an ordered list
      await selectAllText(input);
      const orderedListButton = await queries.findByLabelText(
        doc,
        'Numbered list'
      );
      await orderedListButton.click();

      // ul should not be in the document
      await waitForNumberOfTags('ul', 0);

      // ol should be in the document
      await waitForNumberOfTags('ol', 1);

      // two li tags should still be in the document
      await waitForNumberOfTags('li', 2);
    });
  });
});
