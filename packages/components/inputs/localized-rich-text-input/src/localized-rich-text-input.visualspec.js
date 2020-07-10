import { percySnapshot } from '@percy/puppeteer';
import { getDocument, queries, wait } from 'pptr-testing-library';

const { getByLabelText, getByTestId, getAllByLabelText, getByText } = queries;

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

  const getNumberOfTags = async (tagName) => {
    // eslint-disable-next-line no-shadow
    const numberOfTags = await page.evaluate((tagName) => {
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
    let input = await getByTestId(doc, 'rich-text-data-test-en');

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
    input = await getByTestId(doc, 'rich-text-data-test-de');

    boldButton = boldButtons[1];

    await boldButton.click();

    await input.type('Hello world');

    // check that there is now a strong tag in the document.
    numOfTags = await getNumberOfTags('strong');

    // now back to English
    input = await getByTestId(doc, 'rich-text-data-test-en');
    // start by removing all the text
    await selectAllText(input);
    await input.press('Backspace');

    // next, open the Style menu

    // blur input first to test that editor focus works correctly
    await blur(input);

    const styleMenuButtons = await getAllByLabelText(doc, 'Style');
    const styleMenuButton = styleMenuButtons[0];
    await styleMenuButton.click();

    await wait(() => getByText(doc, 'Headline H1'));
    await percySnapshot(page, 'LocalizedRichTextInput - style menu open');

    // then click on the H1 button
    const h1Button = await getByText(doc, 'Headline H1');
    await h1Button.click();

    // now type into the input
    const h1Text = 'Hello World';
    await input.type(h1Text);
  });
});
