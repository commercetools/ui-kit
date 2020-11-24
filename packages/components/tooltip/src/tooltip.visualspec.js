import { percySnapshot } from '@percy/puppeteer';
import { getDocument, queries } from 'pptr-testing-library';

describe('Tooltip', () => {
  it('Default', async () => {
    await page.goto(`${HOST}/tooltip`);

    expect(page).toMatch('Closed');

    await percySnapshot(page, 'Tooltip');
  });

  it('Interactive', async () => {
    await page.goto(`${HOST}/tooltip/interactive`);

    expect(page).toMatch('Open');

    const doc = await getDocument(page);

    await page.hover('button');

    await queries.findByText(doc, 'What kind of bear is best');

    await percySnapshot(page, 'Tooltip - hovered');
  });
});
