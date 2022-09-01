import percySnapshot from '@percy/puppeteer';
import { getDocument, queries } from 'pptr-testing-library';

describe('ThemeProvider', () => {
  it('Default', async () => {
    await page.goto(`${HOST}/theme-provider`);
    await expect(page).toMatch('use global default theme');
    await percySnapshot(page, 'ThemeProvider');
  });
});

describe('Interactive', () => {
  it('applies changes to global and local theme provider', async () => {
    await page.goto(`${HOST}/theme-provider/interactive`);
    const doc = await getDocument(page);

    // page.on('console', msg => console.log('PAGE LOG:', msg.text()));

    // change global theme
    const globalThemeChangeButton = await queries.getByText(
      doc,
      'change global theme'
    );

    await globalThemeChangeButton.click();
    await page.waitForSelector('html[data-theme="dark"]');
    await page.waitForTimeout(1000);
    await percySnapshot(page, 'ThemeProvider - after global theme change');

    // change local theme
    const localThemeChangeButton = await queries.getByText(
      doc,
      'change local theme'
    );
    await localThemeChangeButton.click();
    await page.waitForSelector('#local[data-theme="dark"]');
    await page.waitForTimeout(1000);
    await percySnapshot(page, 'ThemeProvider - after local theme change');
  });
});
