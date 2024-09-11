import { customProperties, designTokens, version } from '../presets/ui-kit';

describe('exports', () => {
  // This field has been deprecated
  it('should export custom-properties', () => {
    expect(customProperties).toBeTruthy();
  });

  it('should export design-tokens', () => {
    expect(designTokens).toBeTruthy();
  });

  describe('version', () => {
    it('should be defined', () => {
      expect(version).toBeDefined();
    });
  });
});
