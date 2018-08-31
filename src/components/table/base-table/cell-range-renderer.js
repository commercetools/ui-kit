/**
 * This method is taken from the React Virtualized repo and adapted to always
 * read from the cellCache that this method gets via the options param.
 *
 * Here is the reasoning why RV doesn't do so by default:
 *  Avoid re-creating cells while scrolling.
 *  This can lead to the same cell being created many times and can cause performance issues for "heavy" cells.
 *  If a scroll is in progress- cache and reuse cells.
 *  This cache will be thrown away once scrolling completes.
 *  However if we are scaling scroll positions and sizes, we should also avoid caching.
 *  This is because the offset changes slightly as scroll position changes and caching leads to stale values.
 *  For more info refer to issue #395
 *
 * In our case we have a limited number of rows and columns
 */
export default function cellRangeRenderer({
  cellCache,
  cellRenderer,
  columnSizeAndPositionManager,
  columnStartIndex,
  columnStopIndex,
  deferredMeasurementCache,
  horizontalOffsetAdjustment,
  isScrolling,
  parent, // Grid (or List or Table)
  rowSizeAndPositionManager,
  rowStartIndex,
  rowStopIndex,
  styleCache,
  verticalOffsetAdjustment,
  visibleColumnIndices,
  visibleRowIndices,
}) {
  const renderedCells = [];

  // Browsers have native size limits for elements (eg Chrome 33M pixels, IE 1.5M pixes).
  // User cannot scroll beyond these size limitations.
  // In order to work around this, ScalingCellSizeAndPositionManager compresses offsets.
  // We should never cache styles for compressed offsets though as this can lead to bugs.
  // See issue #576 for more.
  const areOffsetsAdjusted =
    columnSizeAndPositionManager.areOffsetsAdjusted() ||
    rowSizeAndPositionManager.areOffsetsAdjusted();

  const canCacheStyle = !isScrolling && !areOffsetsAdjusted;

  for (let rowIndex = rowStartIndex; rowIndex <= rowStopIndex; rowIndex += 1) {
    const rowDatum = rowSizeAndPositionManager.getSizeAndPositionOfCell(
      rowIndex
    );

    for (
      let columnIndex = columnStartIndex;
      columnIndex <= columnStopIndex;
      columnIndex += 1
    ) {
      const columnDatum = columnSizeAndPositionManager.getSizeAndPositionOfCell(
        columnIndex
      );
      const isVisible =
        columnIndex >= visibleColumnIndices.start &&
        columnIndex <= visibleColumnIndices.stop &&
        rowIndex >= visibleRowIndices.start &&
        rowIndex <= visibleRowIndices.stop;
      const key = `${rowIndex}-${columnIndex}`;
      let style;

      // Cache style objects so shallow-compare doesn't re-render unnecessarily.
      if (canCacheStyle && styleCache[key]) {
        style = styleCache[key];
      } else if (
        // In deferred mode, cells will be initially rendered before we know their size.
        // Don't interfere with CellMeasurer's measurements by setting an invalid size.
        deferredMeasurementCache &&
        !deferredMeasurementCache.has(rowIndex, columnIndex)
      ) {
        // Position not-yet-measured cells at top/left 0,0,
        // And give them width/height of 'auto' so they can grow larger than the parent Grid if necessary.
        // Positioning them further to the right/bottom influences their measured size.
        style = {
          height: 'auto',
          left: 0,
          position: 'absolute',
          top: 0,
          width: 'auto',
        };
      } else {
        style = {
          height: rowDatum.size,
          left: columnDatum.offset + horizontalOffsetAdjustment,
          position: 'absolute',
          top: rowDatum.offset + verticalOffsetAdjustment,
          width: columnDatum.size,
        };

        // eslint-disable-next-line no-param-reassign
        styleCache[key] = style;
      }

      const cellRendererParams = {
        columnIndex,
        isScrolling,
        isVisible,
        key,
        parent,
        rowIndex,
        style,
      };

      // This is the main difference to the default cellRangeRenderer:
      // Don't re-render the cells when the table is being scrolled. Otherwise
      // this will harm performance since we are rendering all the cells of the
      // table and not only the ones that are visible.
      if (!cellCache[key] || !isScrolling) {
        // eslint-disable-next-line no-param-reassign
        cellCache[key] = cellRenderer(cellRendererParams);
      }

      const renderedCell = cellCache[key];

      if (renderedCell == null || renderedCell === false) {
        // eslint-disable-next-line no-continue
        continue;
      }

      renderedCells.push(renderedCell);
    }
  }

  return renderedCells;
}
