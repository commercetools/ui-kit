import { percySnapshot } from '@percy/puppeteer';
import { getDocument, queries } from 'pptr-testing-library';

const { getByLabelText } = queries;

describe('LocalizedMoneyInput', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/localized-money-input`);
  });

  it('Default', async () => {
    const doc = await getDocument(page);
    const cadInput = await getByLabelText(doc, 'CAD');
    expect(cadInput).toBeTruthy();
    await percySnapshot(page, 'LocalizedMoneyInput');
  });
});
