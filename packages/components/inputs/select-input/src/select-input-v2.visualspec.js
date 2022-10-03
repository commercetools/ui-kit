// import percySnapshot from '@percy/puppeteer';
import {
  Eyes,
  VisualGridRunner,
  Configuration,
  Target,
  BrowserType,
} from '@applitools/eyes-puppeteer';

describe('SelectInput', () => {
  let runner, eyes;

  beforeAll(async () => {
    runner = new VisualGridRunner();
    eyes = new Eyes(runner);
    const conf = new Configuration();
    conf.addBrowser(1024, 768, BrowserType.CHROME);
    eyes.setConfiguration(conf);
    await eyes.open(page, 'UI-Kit', 'Select Input', {
      width: 1024,
      height: 768,
    });
  });

  afterAll(async () => {
    await eyes.close();
  });

  it('Default', async () => {
    await page.goto(`${globalThis.HOST}/select-input`);
    await expect(page).toMatch('minimal');
    await eyes.check('base', Target.window().fully());
  });

  it('Open', async () => {
    await page.goto(`${globalThis.HOST}/select-input/open`);
    await page.click('#select-input');
    await expect(page).toMatch('One');
    await eyes.check('open - without option groups', Target.window().fully());
  });
  it('Open - dark', async () => {
    await page.goto(`${globalThis.HOST}/select-input/open-dark`);
    await page.click('#select-input');
    await expect(page).toMatch('One');
    await eyes.check(
      'open - with custom (dark) theme',
      Target.window().fully()
    );
  });
  it('Open with option groups', async () => {
    await page.goto(`${globalThis.HOST}/select-input/open-with-option-groups`);
    await page.click('#select-input');
    await eyes.check(
      'open - option group with no divider',
      Target.window().fully()
    );
  });
  it('Open with option groups and divider', async () => {
    await page.goto(
      `${globalThis.HOST}/select-input/open-with-option-groups-and-divider`
    );
    await page.click('#select-input');
    await eyes.check(
      'open - option group with divider',
      Target.window().fully()
    );
  });
});
