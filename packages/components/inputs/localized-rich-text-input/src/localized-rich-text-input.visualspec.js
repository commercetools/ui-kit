import percySnapshot from '@percy/puppeteer';
import puppeteer from 'puppeteer';
import { getDocument, queries } from 'pptr-testing-library';
let browser;
let page;

jest.setTimeout(20000);

beforeEach(async () => {
  browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: 'new',
    slowMo: 10, // Launching the browser in slow motion is necessary due to race conditions. Otherwise browser closes prematurely and tests fail.
  });
  page = await browser.newPage();
});
afterEach(async () => {
  await browser.close();
});

describe('LocalizedRichTextInput', () => {
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
      { timeout: 5000 },
      tagName,
      count
    );
  };

  it('Default', async () => {
    await page.goto(`${globalThis.HOST}/localized-rich-text-input`);
    await page.waitForSelector('text/minimal');
    await percySnapshot(page, 'LocalizedRichTextInput');
  });

  it('Interactive', async () => {
    await page.goto(`${globalThis.HOST}/localized-rich-text-input/interactive`);
    const doc = await getDocument(page);
    let input = await queries.findByTestId(doc, 'rich-text-data-test-en');

    await input.focus();

    // make the text bold
    let boldButton = await queries.findByLabelText(doc, 'Bold');
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

    const expandButton = await queries.findByLabelText(
      doc,
      'Show all languages (2)'
    );
    await expandButton.click();

    const boldButtons = await queries.findAllByLabelText(doc, 'Bold');
    // there should be three bold buttons (3 inputs open)
    expect(boldButtons.length).toBe(3);

    // switch to german input
    input = await queries.findByTestId(doc, 'rich-text-data-test-de');
    await input.focus();

    boldButton = boldButtons[1];

    await boldButton.click();

    await input.type('Hello world');

    // check that there is now a strong tag in the document.
    await waitForNumberOfTags('strong', 1);

    // now back to English
    input = await queries.findByTestId(doc, 'rich-text-data-test-en');
    // start by removing all the text
    await selectAllText(input);
    await input.press('Backspace');

    // next, open the Style menu

    // blur input first to test that editor focus works correctly
    await blur(input);

    const styleMenuButtons = await queries.findAllByLabelText(doc, 'Style');
    const styleMenuButton = styleMenuButtons[0];
    await styleMenuButton.click();

    await queries.findByText(doc, 'Headline H1');
    // TODO: uncomment when issue with Percy is resolved
    // await percySnapshot(page, 'LocalizedRichTextInput - style menu open');

    // then click on the H1 button
    const h1Button = await queries.findByText(doc, 'Headline H1');
    await h1Button.click();

    // now type into the input
    const h1Text = 'Hello World';
    await input.type(h1Text);
    await waitForNumberOfTags('h1', 1);

    // reset the input
    const resetButton = await queries.findByLabelText(
      doc,
      'Reset value to lorem ipsum'
    );
    await resetButton.click();
    await waitForNumberOfTags('h1', 0);
    const allLorem = await queries.findAllByText(
      doc,
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    );
    expect(allLorem.length).toBe(3);
  });
});
