import { percySnapshot } from '@percy/puppeteer';
import { getDocument, queries, wait } from 'pptr-testing-library';

const { getByLabelText, getByText } = queries;

describe('RichTextInput', () => {
  const selectAllText = async () => {
    await page.evaluate(() => {
      const richTextInput = document.querySelector('#rich-text');
      const range = document.createRange();
      range.selectNodeContents(richTextInput);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    });
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
    const boldButton = await getByLabelText(doc, 'bold');
    await boldButton.click();

    await input.type('Hello world');
    await wait(() => getByText(doc, 'Hello world'));

    // check that there is now a strong tag in the document.
    let numOfStrongTags = await getNumberOfTags('strong');

    expect(numOfStrongTags).toEqual(1);

    // select the text
    selectAllText();
    // click the bold button again
    await boldButton.click();

    // check there are no strong tags in the document.
    numOfStrongTags = await getNumberOfTags('strong');
    expect(numOfStrongTags).toEqual(0);
  });
});
