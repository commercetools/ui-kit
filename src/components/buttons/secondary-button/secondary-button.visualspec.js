import { percySnapshot } from '@percy/puppeteer';
import { getDocument, queries } from 'pptr-testing-library';

const { getAllByLabelText } = queries;

describe('SecondaryButton', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/secondary-button`);
  });

  it('Default', async () => {
    const doc = await getDocument(page);
    const button = await getAllByLabelText(doc, 'A label text');
    expect(button).toBeTruthy();
    await percySnapshot(page, 'SecondaryButton');
  });
});
