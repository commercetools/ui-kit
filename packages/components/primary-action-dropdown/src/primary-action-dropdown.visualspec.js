import percySnapshot from '@percy/puppeteer';
import { getDocument, queries } from 'pptr-testing-library';

describe('PrimaryActionDropdown', () => {
  it('Default', async () => {
    await page.goto(`${HOST}/primary-action-dropdown`);
    const doc = await getDocument(page);
    const dropdowns = await queries.findAllByLabelText(doc, 'Open Dropdown');
    await expect(dropdowns).toBeTruthy();
    await percySnapshot(page, 'PrimaryActionDropdown');
  });

  it('When open', async () => {
    await page.goto(`${HOST}/primary-action-dropdown/interaction`);
    const doc = await getDocument(page);
    const dropdowns = await queries.findAllByLabelText(doc, 'Open Dropdown');
    await dropdowns[0].click();
    await percySnapshot(page, 'PrimaryActionDropdown - Open');
  });
});
