import { percySnapshot } from '@percy/puppeteer';
import { getDocument, queries } from 'pptr-testing-library';

const { getAllByLabelText } = queries;

describe('LocalizedMoneyInput', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/localized-money-input`);
  });

  it('Default', async () => {
    const doc = await getDocument(page);
    const cadInputs = await getAllByLabelText(doc, 'CAD');
    expect(cadInputs).toBeTruthy();
    await percySnapshot(page, 'LocalizedMoneyInput');
  });
});
