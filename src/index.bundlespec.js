import {
  i18n,
  customProperties,
  version,
} from '@commercetools-frontend/ui-kit';

describe('exports', () => {
  it('should export i18n for six languages', () => {
    expect(Object.keys(i18n)).toEqual(
      expect.arrayContaining(['de', 'en', 'es', 'frFR', 'ja', 'zhCN'])
    );
  });

  it('should export custom-properties', () => {
    expect(customProperties).toBeTruthy();
  });

  describe('version', () => {
    it('should be defined', () => {
      expect(version).toBeDefined();
    });
  });

  it('should have the translations', () => {
    // This test ensures some translations exist, assuming the others would
    // work as well then
    expect(Object.keys(i18n.en)[0]).toEqual(expect.any(String));
    expect(Object.keys(i18n.de)[0]).toEqual(expect.any(String));
    expect(Object.keys(i18n.es)[0]).toEqual(expect.any(String));
    expect(Object.keys(i18n.frFR)[0]).toEqual(expect.any(String));
    expect(Object.keys(i18n.zhCN)[0]).toEqual(expect.any(String));
  });
});
