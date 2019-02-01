import filterEventAttributes from './filter-event-attributes';

describe('filterEventAttributes', () => {
  it('filters event attributes', () => {
    const eventAttrs = {
      onMouseEnter: () => {},
      onFocus: () => {},
    };
    const nonDataAttrs = {
      two: 2,
      four: 4,
    };
    const dataObject = {
      ...eventAttrs,
      ...nonDataAttrs,
    };

    expect(filterEventAttributes(dataObject)).toEqual(eventAttrs);
  });
});
