import percySnapshot from '@percy/puppeteer';
import { getDocument, queries } from 'pptr-testing-library';

describe('DateInput', () => {
  it('Default', async () => {
    await page.goto(`${globalThis.HOST}/date-input`);
    await page.waitForSelector('text/minimal');
    await percySnapshot(page, 'DateInput');
  });
  it('Open', async () => {
    await page.goto(`${globalThis.HOST}/date-input-open`);
    await page.click('#date-input');
    await page.waitForSelector('text/November');
    // TODO: uncomment when issue with Percy is resolved
    // await percySnapshot(page, 'DateInput - open');

    const doc = await getDocument(page);
    const input = await queries.findByTestId(doc, 'date-input');

    const prevMonthButton = await queries.findByLabelText(
      doc,
      'show prev month'
    );
    await prevMonthButton.click();

    await queries.findByText(doc, 'October');
    // our input should still be focused even though we clicked a header button

    await input.press('Backspace');
    await input.press('Backspace');
    await input.press('Backspace');
    await input.press('Backspace');
    await input.type('2017');
    await queries.findByText(doc, '2017');
  });
  it('Filter Appearance', async () => {
    await page.goto(`${globalThis.HOST}/date-input--filter-appearance`);
    await page.waitForSelector('text/November');
    await percySnapshot(page, 'DateInput - Filter Appearance');
  });
});
