import { i18n, customProperties } from 'ui-kit';
// import { i18n, customProperties } from '..';

describe('exports', () => {
  it('should export i18n for three languages', () => {
    expect(Object.keys(i18n)).toEqual(['en', 'de', 'es']);
  });
  it('should export custom-properties', () => {
    expect(customProperties).toBeTruthy();
  });
});
