import percySnapshot from '@percy/puppeteer';
import { getDocument, queries } from 'pptr-testing-library';

describe('SecondaryButton', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/secondary-button`);
  });

  it('Default', async () => {
    const doc = await getDocument(page);
    const button = await queries.findAllByLabelText(doc, 'A label text');
    expect(button).toBeTruthy();
    await percySnapshot(page, 'SecondaryButton');
  });
});
