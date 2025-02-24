import { renderHook, act } from '@testing-library/react';
import useSorting from './use-sorting';

const testItems = [
  { id: '1-parasite', title: 'Parasite', year: 2019 },
  { id: '2-good', title: 'Good Time', year: 2017 },
  { id: '3-woman', title: 'Woman At War', year: 2018 },
];

describe('when using without a columnKey', () => {
  it('should return the same order of items', () => {
    const { result } = renderHook(() => useSorting(testItems));

    expect(result.current.items[0]).toEqual(testItems[0]);
    expect(result.current.items[1]).toEqual(testItems[1]);
    expect(result.current.items[2]).toEqual(testItems[2]);
  });
  describe('when setting the sorting to a key', () => {
    it('should order numbers in ascendent order', () => {
      const { result } = renderHook(() => useSorting(testItems));

      act(() => {
        result.current.onSortChange('year');
      });

      // assert the order of the items manually
      expect(result.current.items[0].year).toEqual(2017);
      expect(result.current.items[1].year).toEqual(2018);
      expect(result.current.items[2].year).toEqual(2019);

      // assert the returned sorting information
      expect(result.current.sortedBy).toEqual('year');
      expect(result.current.sortDirection).toEqual('asc');
    });
    it('should order strings in ascendent order', () => {
      const { result } = renderHook(() => useSorting(testItems));

      act(() => {
        result.current.onSortChange('title');
      });

      // assert the order of the items manually
      expect(result.current.items[0].title).toEqual('Good Time');
      expect(result.current.items[1].title).toEqual('Parasite');
      expect(result.current.items[2].title).toEqual('Woman At War');

      // assert the returned sorting information
      expect(result.current.sortedBy).toEqual('title');
      expect(result.current.sortDirection).toEqual('asc');
    });
  });
});
describe('when using with a columnKey and sortDirection', () => {
  it('should return the items ordered in the correct direction', () => {
    const { result } = renderHook(() => useSorting(testItems, 'year', 'desc'));

    // assert the order of the items manually
    expect(result.current.items[0].year).toEqual(2019);
    expect(result.current.items[1].year).toEqual(2018);
    expect(result.current.items[2].year).toEqual(2017);

    // assert the returned sorting information
    expect(result.current.sortedBy).toEqual('year');
    expect(result.current.sortDirection).toEqual('desc');
  });
  describe('when changing the sorting on the same key', () => {
    it('should reverse order of the items', () => {
      const { result } = renderHook(() =>
        useSorting(testItems, 'year', 'desc')
      );

      act(() => {
        result.current.onSortChange('year');
      });

      // assert the order of the items manually
      expect(result.current.items[0].year).toEqual(2017);
      expect(result.current.items[1].year).toEqual(2018);
      expect(result.current.items[2].year).toEqual(2019);

      // assert the returned sorting information
      expect(result.current.sortedBy).toEqual('year');
      expect(result.current.sortDirection).toEqual('asc');
    });
  });
});

describe('when using with a custom sorting method', () => {
  it('should return the items ordered in the correct direction', () => {
    // todo
  });
});
