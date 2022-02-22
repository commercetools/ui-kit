import { customProperties, version } from '@commercetools-frontend/ui-kit';

describe('exports', () => {
  it('should export custom-properties', () => {
    expect(customProperties).toBeTruthy();
  });

  describe('version', () => {
    it('should be defined', () => {
      expect(version).toBeDefined();
    });
  });
});
