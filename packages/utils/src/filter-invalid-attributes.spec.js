import filterInvalidAttributes from './filter-invalid-attributes';

describe('fitlerInvalidAttributes', () => {
  it('filters invalid attributes', () => {
    const dataAttrs = {
      'aria-label': 'hello world',
      'aria-disabled': 'true',
      disabled: false,
      'data-testid': 'hello-test',
    };
    const nonDataAttrs = {
      two: 2,
      four: 4,
    };
    const dataObject = {
      ...dataAttrs,
      ...nonDataAttrs,
    };

    expect(filterInvalidAttributes(dataObject)).toEqual(dataAttrs);
  });
});
