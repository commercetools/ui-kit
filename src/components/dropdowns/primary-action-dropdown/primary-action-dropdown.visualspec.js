import { percySnapshot } from '@percy/puppeteer';
import { getDocument, queries } from 'pptr-testing-library';

const { getByLabelText } = queries;

describe('PrimaryActionDropdown', () => {
  it('Default', async () => {
    await page.goto(`${HOST}/primary-action-dropdown`);
    const doc = await getDocument(page);
    const dropdown = await getByLabelText(doc, 'Open Dropdown');
    await expect(dropdown).toBeTruthy();
    await percySnapshot(page, 'PrimaryActionDropdown');
  });

  it('When open', async () => {
    await page.goto(`${HOST}/primary-action-dropdown/interaction`);
    const doc = await getDocument(page);
    const dropdown = await getByLabelText(doc, 'Open Dropdown');
    await dropdown.click();
    await percySnapshot(page, 'PrimaryActionDropdown - Open');
  });
});
