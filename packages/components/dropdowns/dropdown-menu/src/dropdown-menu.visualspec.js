import percySnapshot from '@percy/puppeteer';
import { getDocument, queries } from 'pptr-testing-library';

describe('DropdownMenu', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/dropdown-menu`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/Trigger');

    const doc = await getDocument(page);
    const triggetButton = await queries.findByLabelText(doc, 'Trigger');
    await triggetButton.click();

    await percySnapshot(page, 'DropdownMenu');
  });
});
