import percySnapshot from '@percy/puppeteer';
import { getDocument, queries } from 'pptr-testing-library';
import puppeteer from 'puppeteer';
let browser;
let page;

jest.setTimeout(20000);

beforeEach(async () => {
  browser = await puppeteer.launch({
    slowMo: 10, // Launching the browser in slow motion is necessary due to race conditions. Otherwise browser closes prematurely and tests fail.
  });
  page = await browser.newPage();
});
afterEach(async () => {
  await browser.close();
});

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
