import { percySnapshot } from '@percy/puppeteer';
import { getDocument, queries } from 'pptr-testing-library';

const { getByText } = queries;

describe('AsyncSelectInput', () => {
  it('Default', async () => {
    await page.goto(`${HOST}/async-select-input`);
    await expect(page).toMatch('minimal');
    await percySnapshot(page, 'AsyncSelectInput');
  });

  it('Open', async () => {
    await page.goto(`${HOST}/async-select-input-open`);
    const doc = await getDocument(page);
    const select = await getByText(doc, 'One');
    await select.click();
    // typing triggers async loadOptions
    await select.type('Two');
    await percySnapshot(page, 'AsyncSelectInput - open');
  });
});
