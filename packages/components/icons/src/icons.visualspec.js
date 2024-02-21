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
  'success',
];

describe('Icons', () => {
  describe('Colors', () => {
    colors.map((color) =>
      it(`Color ${color}`, async () => {
        await page.goto(`${globalThis.HOST}/icons/${color}`);
        await page.waitForSelector(`text/${color}`);
        await snapshot(page, `Icons - Color: ${color}`);
      })
    );
  });
  it('Inline SVG', async () => {
    await page.goto(`${globalThis.HOST}/icons/inline-svg`);
    await page.waitForSelector('text/Inline SVG');
    await percySnapshot(page, `Icons - Inline SVG`);
  });
  it('Leading Icon', async () => {
    await page.goto(`${globalThis.HOST}/icons/leading-icon`);
    await page.waitForSelector('text/Leading Icon');
    await percySnapshot(page, `Icons - Leading Icon`);
  });
});
