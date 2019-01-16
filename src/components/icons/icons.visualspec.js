import { percySnapshot } from '@percy/puppeteer';

// let's go wide, to fit more icons.
const snapshot = (page, description) =>
  percySnapshot(page, description, { widths: [1600] });

const capitalize = s => s[0].toUpperCase() + s.slice(1);
const themes = [
  'black',
  'grey',
  'white',
  'blue',
  'green',
  'green-light',
  'orange',
  'red',
];

describe('Icons', () => {
  themes.map(theme =>
    it(capitalize(theme), async () => {
      await page.goto(`${HOST}/icons/${theme}`);
      await expect(page).toMatch(theme);
      await snapshot(page, `Icons - Theme: ${theme}`);
    })
  );
});
