import { percySnapshot } from '@percy/puppeteer';
import { getDocument, queries, wait } from 'pptr-testing-library';

const { getByLabelText, getByTestId, getByText } = queries;

describe('DateInput', () => {
  it('Default', async () => {
    await page.goto(`${HOST}/date-input`);
    await expect(page).toMatch('minimal');
    await percySnapshot(page, 'DateInput');
  });
  it('Open', async () => {
    await page.goto(`${HOST}/date-input-open`);
    await page.click('#date-input');
    await expect(page).toMatch('November');
    await percySnapshot(page, 'DateInput - open');

    const doc = await getDocument(page);
    const input = await getByTestId(doc, 'date-input');

    const prevMonthButton = await getByLabelText(doc, 'show prev month');
    await prevMonthButton.click();

    await wait(() => getByText(doc, 'October'));
    // our input should still be focused even though we clicked a header button

    await input.press('Backspace');
    await input.press('Backspace');
    await input.press('Backspace');
    await input.press('Backspace');
    await input.type('2017');
    await wait(() => getByText(doc, '2017'));
  });
});
