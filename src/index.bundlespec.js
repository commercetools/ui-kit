import { loadIntlMessages, customProperties } from 'ui-kit';

describe('exports', () => {
  ['en', 'de', 'es', 'fr-FR', 'zh-CN'].forEach(locale => {
    it(`should load messages for "${locale}"`, async () => {
      const messages = await loadIntlMessages(locale);
      expect(messages).toBeDefined();
    });
  });

  it('should export custom-properties', () => {
    expect(customProperties).toBeTruthy();
  });
});
