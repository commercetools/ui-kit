import percySnapshot from '@percy/puppeteer';

// let's go wide, to fit more icons.
const snapshot = (page, description) =>
  percySnapshot(page, description, { widths: [1600] });

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
  describe('Colors', () => {
    colors.map((color) =>
      it(`Color ${color}`, async () => {
        await page.goto(`${HOST}/icons/${color}`);
        await expect(page).toMatch(color);
        await snapshot(page, `Icons - Color: ${color}`);
      })
    );
  });
  it('Theme', async () => {
    await page.goto(`${HOST}/icons/theme`);
    await expect(page).toMatch('Themed Icons');
    await percySnapshot(page, `Icons - Dark theme`);
  });
  it('Inline SVG', async () => {
    await page.goto(`${HOST}/icons/inline-svg`);
    await expect(page).toMatch('Inline SVG');
    await percySnapshot(page, `Icons - Inline SVG`);
  });
});
