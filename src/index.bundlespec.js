import { customProperties } from '../dist/ui-kit.esm';
import en from '../dist/ui-kit.esm/en';
import es from '../dist/ui-kit.esm/es';
import de from '../dist/ui-kit.esm/de';

describe('exports', () => {
  it('should export custom-properties', () => {
    expect(customProperties).toBeTruthy();
  });

  it('should have the translations', () => {
    // This test ensures some translations exist, assuming the others would
    // work as well then
    expect(Object.keys(en)[0]).toEqual(expect.any(String));
    expect(Object.keys(de)[0]).toEqual(expect.any(String));
    expect(Object.keys(es)[0]).toEqual(expect.any(String));
  });
});
