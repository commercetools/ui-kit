import { i18n, customProperties } from 'ui-kit';

describe('exports', () => {
  it('should export i18n for three languages', () => {
    expect(Object.keys(i18n)).toEqual(['en', 'de', 'es']);
  });

  it('should export custom-properties', () => {
    expect(customProperties).toBeTruthy();
  });

  it('should have the translations', () => {
    // This test ensures some translations exist, assuming the others would
    // work as well then
    expect(i18n.en['UIKit.DateInput.labelRange']).toEqual('to');
    expect(i18n.de['UIKit.DateInput.labelRange']).toEqual('bis');
    expect(i18n.es['UIKit.DateInput.labelRange']).toEqual('hasta');
  });
});
