import { percySnapshot } from '@percy/puppeteer';
import { getDocument, queries } from 'pptr-testing-library';

describe('LocalizedMoneyInput', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/localized-money-input`);
  });

  it('Default', async () => {
    const doc = await getDocument(page);
    const cadInputs = await queries.findAllByLabelText(doc, 'CAD');
    expect(cadInputs).toBeTruthy();
    await percySnapshot(page, 'LocalizedMoneyInput');
  });
});
