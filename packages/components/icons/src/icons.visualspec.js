import percySnapshot from '@percy/puppeteer';

// let's go wide, to fit more icons.
const snapshot = (page, description) =>
  percySnapshot(page, description, { widths: [1600] });

const capitalize = (s) => s[0].toUpperCase() + s.slice(1);
const colors = [
  'solid',
  'neutral60',
  'surface',
  'info',
  'primary',
  'primary40',
  'warning',
  'error',
];

describe('Icons', () => {
  colors.map((color) =>
    // eslint-disable-next-line jest/valid-title
    it(capitalize(color), async () => {
      await page.goto(`${HOST}/icons/${color}`);
      await expect(page).toMatch(color);
      await snapshot(page, `Icons - Color: ${color}`);
    })
  );
  it('Default', async () => {
    await page.goto(`${HOST}/icons/theme`);
    await expect(page).toMatch('Themed Icons');
    await percySnapshot(page, `Icons - Dark theme`);
  });
});
