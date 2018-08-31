import filterDataAttributes from './filter-data-attributes';

describe('filterDataAttributes', () => {
  it('filters data attributes', () => {
    const dataAttrs = {
      'data-one': 1,
      'data-three': 3,
    };
    const nonDataAttrs = {
      two: 2,
      four: 4,
    };
    const dataObject = {
      ...dataAttrs,
      ...nonDataAttrs,
    };

    expect(filterDataAttributes(dataObject)).toEqual(dataAttrs);
  });
});
