import percySnapshot from '@percy/puppeteer';
import { getDocument, queries } from 'pptr-testing-library';

describe('ThemeProvider', () => {
  it('Default', async () => {
    await page.goto(`${globalThis.HOST}/theme-provider`);
    await page.waitForSelector('text/use global default theme');
    await percySnapshot(page, 'ThemeProvider');
  });
});
describe('Interactive', () => {
  it('applies changes to global and local theme provider', async () => {
    await page.goto(`${globalThis.HOST}/theme-provider/interactive`);
    const doc = await getDocument(page);

    // change global theme
    const globalThemeChangeButton = await queries.findByText(
      doc,
      'change global theme'
    );

    await globalThemeChangeButton.click();
    await page.waitForSelector('[data-theme="default"]');
    // TODO: uncomment when issue with Percy is resolved
    // await percySnapshot(page, 'ThemeProvider - after global theme change');

    // change local theme
    const localThemeChangeButton = await queries.findByText(
      doc,
      'change local theme'
    );
    await localThemeChangeButton.click();
    await page.waitForSelector('[data-theme="default"]');
    // TODO: uncomment when issue with Percy is resolved
    // await percySnapshot(page, 'ThemeProvider - after local theme change');
  });
});
