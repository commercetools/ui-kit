import { renderHook, act } from '@testing-library/react';
import useManualColumnResizing from './use-manual-column-resizing-reducer';

const createMockedTableRef = (headersWidths) => {
  return {
    current: {
      querySelectorAll: () => {
        return headersWidths.map((item, index) => ({
          getAttribute: () => index,
          getBoundingClientRect: () => ({
            width: item,
          }),
        }));
      },
      style: {
        gridTemplateColumns: '',
      },
    },
  };
};

const createMockedHeaderRef = (headerWidth, index) => ({
  current: {
    clientWidth: headerWidth,
    cellIndex: index,
  },
});

const createMockedMouseEventPosition = (clientX) => ({
  clientX,
});

describe('useManualColumnResizing', () => {
  beforeAll(() => {
    jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((cb) => cb());
  });

  it('should return all the reducer methods', () => {
    const { result } = renderHook(() =>
      useManualColumnResizing(createMockedTableRef([50, 100, 200]))
    );

    expect(result.current.reset).toBeDefined();
    expect(result.current.getSizes).toBeDefined();
    expect(result.current.startResizing).toBeDefined();
    expect(result.current.onDragResizing).toBeDefined();
    expect(result.current.finishResizing).toBeDefined();
    expect(result.current.getHasTableBeenResized).toBeDefined();
    expect(result.current.getIsColumnBeingResized).toBeDefined();
    expect(result.current.getIsAnyColumnBeingResized).toBeDefined();
    expect(result.current.getTotalResizedTableWidth).toBeDefined();
  });

  it('should correctly initialize with untouched state', () => {
    const { result } = renderHook(() =>
      useManualColumnResizing(createMockedTableRef([50, 100, 200]))
    );

    expect(result.current.getHasTableBeenResized()).toBe(false);
    expect(result.current.getIsAnyColumnBeingResized()).toBe(false);
    expect(result.current.getSizes().map((size) => size.width)).toStrictEqual([
      50, 100, 200,
    ]);
  });

  it('should correctly register the start of a resize', () => {
    const { result } = renderHook(() =>
      useManualColumnResizing(createMockedTableRef([50, 100, 200]))
    );

    expect(result.current.getIsAnyColumnBeingResized()).toBe(false);
    expect(result.current.getIsColumnBeingResized(0)).toBe(false);
    expect(result.current.getIsColumnBeingResized(1)).toBe(false);
    expect(result.current.getIsColumnBeingResized(2)).toBe(false);

    // Pretend starting to resize the second column
    act(() => {
      result.current.startResizing(
        createMockedHeaderRef(100, 1),
        createMockedMouseEventPosition(300)
      );
    });

    expect(result.current.getIsAnyColumnBeingResized()).toBe(true);

    expect(result.current.getIsColumnBeingResized(0)).toBe(false);
    expect(result.current.getIsColumnBeingResized(1)).toBe(true);
    expect(result.current.getIsColumnBeingResized(2)).toBe(false);
  });

  it('should correctly register dragging', () => {
    const { result } = renderHook(() =>
      useManualColumnResizing(createMockedTableRef([50, 100, 200]))
    );

    expect(result.current.getIsAnyColumnBeingResized()).toBe(false);

    // Pretend starting to resize the second column
    act(() => {
      result.current.startResizing(
        createMockedHeaderRef(100, 1),
        createMockedMouseEventPosition(300)
      );
    });

    act(() => {
      result.current.onDragResizing(
        // move mouse 50px to the right
        createMockedMouseEventPosition(350),
        1
      );
    });

    expect(result.current.getIsAnyColumnBeingResized()).toBe(true);
    expect(result.current.getIsColumnBeingResized(1)).toBe(true);

    // assert the second column is now 50px larger
    expect(result.current.getSizes().map((size) => size.width)).toStrictEqual([
      50,
      100 + 50,
      200,
    ]);
  });

  it('should correctly register finish of dragging', () => {
    const { result } = renderHook(() =>
      useManualColumnResizing(createMockedTableRef([50, 100, 200]))
    );

    act(() => {
      result.current.startResizing(
        createMockedHeaderRef(100, 1),
        createMockedMouseEventPosition(300)
      );
    });

    act(() => {
      result.current.onDragResizing(
        // move mouse 50px to the right
        createMockedMouseEventPosition(350),
        1
      );
    });

    let sizes;
    act(() => {
      sizes = result.current.finishResizing().map((size) => size.width);
    });

    // assert the second column is now 50px larger
    expect(sizes).toStrictEqual([50, 100 + 50, 200]);

    // assert the outputs are consistent
    expect(result.current.getSizes().map((size) => size.width)).toStrictEqual(
      sizes
    );

    // assert no columns are being resized anymore
    expect(result.current.getIsAnyColumnBeingResized()).toBe(false);
    expect(result.current.getIsColumnBeingResized(1)).toBe(false);

    // assert table has been resized
    expect(result.current.getHasTableBeenResized()).toBe(true);

    // assert final table width is consistent with sum of header widths
    const finalSize = 50 + (100 + 50) + 200;
    expect(result.current.getTotalResizedTableWidth()).toEqual(finalSize);
  });

  it('should allow resetting to the initial state', () => {
    const { result } = renderHook(() =>
      useManualColumnResizing(createMockedTableRef([50, 100, 200]))
    );

    act(() => {
      result.current.startResizing(
        createMockedHeaderRef(100, 1),
        createMockedMouseEventPosition(300)
      );
    });

    act(() => {
      result.current.onDragResizing(
        // move mouse 50px to the right
        createMockedMouseEventPosition(350),
        1
      );
    });

    act(() => {
      result.current.finishResizing();
    });

    expect(result.current.getHasTableBeenResized()).toBe(true);

    act(() => {
      result.current.reset();
    });

    expect(result.current.getHasTableBeenResized()).toBe(false);
    expect(result.current.getIsAnyColumnBeingResized()).toBe(false);
    expect(result.current.getSizes().map((size) => size.width)).toStrictEqual([
      50, 100, 200,
    ]);
  });

  afterAll(() => {
    window.requestAnimationFrame.mockRestore();
  });
});
