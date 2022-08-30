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
  it('changes global theme not changing scoped themes', async () => {
    await page.goto(`${HOST}/theme-provider/interactive`);
    const doc = await getDocument(page);

    // change global theme
    const globalThemeChangeButton = await queries.findByText(
      doc,
      'change global theme'
    );
    await globalThemeChangeButton.click();

    await percySnapshot(page, 'ThemeProvider - after global theme change');

    // change local theme
    const localThemeChangeButton = await queries.findByText(
      doc,
      'change local theme'
    );
    await localThemeChangeButton.click();

    await percySnapshot(page, 'ThemeProvider - after local theme change');
  });
});
