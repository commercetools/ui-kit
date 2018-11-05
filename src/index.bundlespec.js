import { i18n, customProperties } from 'ui-kit';

describe('exports', () => {
  it('should export i18n for three languages', () => {
    expect(Object.keys(i18n)).toEqual(['en', 'de', 'es']);
  });

  it('should export custom-properties', () => {
    expect(customProperties).toBeTruthy();
  });

  it('should have translations', () => {
    expect(Object.keys(i18n.en).length > 0).toBe(true);
    expect(Object.keys(i18n.de).length > 0).toBe(true);
    expect(Object.keys(i18n.es).length > 0).toBe(true);
  });

  it('should not have a default key', () => {
    expect(Object.keys(i18n.en)).not.toContain('default');
    expect(Object.keys(i18n.de)).not.toContain('default');
    expect(Object.keys(i18n.es)).not.toContain('default');
  });
});
