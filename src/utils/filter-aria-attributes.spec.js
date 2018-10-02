import filterAriaAttributes from './filter-aria-attributes';

describe('filterAriaAttributes', () => {
  it('filters aria attributes', () => {
    const ariaAttrs = {
      'aria-one': 1,
      'aria-three': 3,
    };
    const nonAriaAttrs = {
      two: 2,
      four: 4,
    };
    const ariaObject = {
      ...ariaAttrs,
      ...nonAriaAttrs,
    };

    expect(filterAriaAttributes(ariaObject)).toEqual(ariaAttrs);
  });
});
