import React from 'react';
import { shallow } from 'enzyme';
import SortableHeader from '../sortable-header';
import BaseTable from './base-table';

jest.mock('dom-helpers/util/scrollbarSize', () => () => 20);
jest.mock('react-virtualized');

const createTestProps = custom => ({
  columns: Array.from({ length: 10 }).map(() => ({
    key: 'ID',
  })),
  itemRenderer: jest.fn(() => <div>{'foo'}</div>),
  rowCount: 20,
  items: Array.from({ length: 50 }, (_, index) => ({ id: index + 1 })),
  maxHeight: 500,
  maxWidth: 500,
  ...custom,
});

describe('BaseTable', () => {
  describe('rendering', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(<BaseTable {...props} />);
    });
    it('should render <MultiGrid>', () => {
      expect(wrapper).toRender('MultiGrid');
    });
    it('should pass deferredMeasurementCache prop to <MultiGrid>', () => {
      expect(wrapper.find('MultiGrid')).toHaveProp(
        'deferredMeasurementCache',
        wrapper.instance().cellMeasurerCache
      );
    });
    describe('when there are fixed columns', () => {
      beforeEach(() => {
        props = createTestProps({
          columns: [{ key: '1', isFixed: true }, { key: '2' }],
        });
        wrapper = shallow(<BaseTable {...props} />);
      });
      it('should pass fixedColumnCount prop to <MultiGrid>', () => {
        expect(wrapper.find('MultiGrid')).toHaveProp('fixedColumnCount', 1);
      });
    });
    it('should pass fixedRowCount prop as 1 to <MultiGrid>', () => {
      expect(wrapper.find('MultiGrid')).toHaveProp('fixedRowCount', 1);
    });
    it('should pass cellRenderer prop to <MultiGrid>', () => {
      expect(wrapper.find('MultiGrid')).toHaveProp(
        'cellRenderer',
        wrapper.instance().itemRenderer
      );
    });
    it('should pass columnWidth prop to <MultiGrid>', () => {
      expect(wrapper.find('MultiGrid')).toHaveProp(
        'columnWidth',
        expect.any(Function)
      );
    });
    it('should pass columnCount prop to <MultiGrid>', () => {
      expect(wrapper.find('MultiGrid')).toHaveProp('columnCount', 10);
    });
    it('should pass height prop to <MultiGrid>', () => {
      expect(wrapper.find('MultiGrid')).toHaveProp('height', 500);
    });
    it('should pass rowHeight prop to <MultiGrid>', () => {
      expect(wrapper.find('MultiGrid')).toHaveProp(
        'rowHeight',
        wrapper.instance().cellMeasurerCache.rowHeight
      );
    });
    it('should pass rowCount prop to <MultiGrid>', () => {
      expect(wrapper.find('MultiGrid')).toHaveProp('rowCount', 21);
    });
    it('should pass width prop to <MultiGrid>', () => {
      expect(wrapper.find('MultiGrid')).toHaveProp('width', 500);
    });
    it('should pass hoveredRowIndex prop to <MultiGrid>', () => {
      expect(wrapper.find('MultiGrid')).toHaveProp(
        'hoveredRowIndex',
        undefined
      );
    });
    it('should pass items prop to <MultiGrid>', () => {
      expect(wrapper.find('MultiGrid')).toHaveProp('items', props.items);
    });
    it('should pass cols prop to <MultiGrid>', () => {
      expect(wrapper.find('MultiGrid')).toHaveProp('cols', props.columns);
    });
    it('should pass onSectionRendered prop to <MultiGrid>', () => {
      expect(wrapper.find('MultiGrid')).toHaveProp(
        'onSectionRendered',
        expect.any(Function)
      );
    });
    describe('handleSectionRendered', () => {
      let measurementCache = {
        rowHeight: () => 50,
        columnWidth: () => 50,
      };
      describe('determining the height of the table', () => {
        describe('enough rows to cover the max height (is scrollable)', () => {
          beforeEach(() => {
            // simulate that the table had fewer rows previously
            wrapper.setState({ height: 300 });
            wrapper.instance().handleSectionRendered({
              measurementCache,
              containerWidth: 500,
            });
          });
          it('should set max height as height', () => {
            expect(wrapper.state('height')).toBe(500);
          });
        });
        describe('height of all rows is less than the max height (not scrollable)', () => {
          beforeEach(() => {
            measurementCache = {
              rowHeight: () => 20,
              columnWidth: () => 50,
            };
            // simulate that the table had fewer rows previously
            wrapper.setState({ height: 300 });
            wrapper.instance().handleSectionRendered({
              measurementCache,
              containerWidth: 500,
            });
          });
          describe('when the table is horizontally scrollable', () => {
            beforeEach(() => {
              measurementCache = {
                rowHeight: () => 20,
                columnWidth: () => 100,
              };
              // simulate that the table had fewer rows previously
              wrapper.setState({ height: 300 });
              wrapper.instance().handleSectionRendered({
                measurementCache,
                containerWidth: 500,
              });
            });
            it('should set the height to the sum of all row heights + the scrollbar height', () => {
              // one would expect 400 because we render 20 rows x 20px height
              // but we also have to consider the header row!
              expect(wrapper.state('height')).toBe(440);
            });
          });
          describe('when the table is not horizontally scrollable', () => {
            it('should set the height to the sum of all row heights', () => {
              // one would expect 400 because we render 20 rows x 20px height
              // but we also have to consider the header row!
              expect(wrapper.state('height')).toBe(420);
            });
          });
        });
      });
      describe('determining the width of the table', () => {
        describe('enough columns to cover the max width (is scrollable)', () => {
          beforeEach(() => {
            wrapper.instance().handleSectionRendered({
              measurementCache,
              containerWidth: 500,
            });
          });
          it('should use set max width as width', () => {
            expect(wrapper.state('width')).toBe(500);
          });
        });
        describe('width of all columns is less than the max width (not scrollable)', () => {
          describe('when vertically scrollable', () => {
            describe('without flex columns', () => {
              beforeEach(() => {
                measurementCache = {
                  rowHeight: () => 50,
                  columnWidth: () => 40,
                };
                wrapper.setState({ remainingWidth: 123 });
                wrapper.instance().handleSectionRendered({
                  measurementCache,
                  containerWidth: 500,
                });
              });
              it('should use set width to the sum of column widths', () => {
                // 10 columns x 40 + scrollbarWidth = 420
                expect(wrapper.state('width')).toBe(420);
              });
              it('should unset the remaining width', () => {
                expect(wrapper.state('remainingWidth')).toBeUndefined();
              });
            });
          });
          describe('when not vertically scrollable', () => {
            describe('without flex columns', () => {
              beforeEach(() => {
                measurementCache = {
                  rowHeight: () => 10,
                  columnWidth: () => 40,
                };
                wrapper.setState({ remainingWidth: 123 });
                wrapper.instance().handleSectionRendered({
                  measurementCache,
                  containerWidth: 500,
                });
              });
              it('should use set width to the sum of column widths', () => {
                // 10 columns x 40 = 400
                expect(wrapper.state('width')).toBe(400);
              });
              it('should unset the remaining width', () => {
                expect(wrapper.state('remainingWidth')).toBeUndefined();
              });
            });
          });
        });
        describe('with flex columns', () => {
          describe('when vertically scrollable', () => {
            beforeEach(() => {
              props = createTestProps({
                columns: [
                  ...Array.from({ length: 8 }).map(() => ({
                    key: 'ID',
                  })),
                  { key: 'flexible1', flexGrow: 1 },
                  { key: 'flexible2', flexGrow: 1 },
                ],
              });
              wrapper = shallow(<BaseTable {...props} />);
              measurementCache = {
                rowHeight: () => 50,
                columnWidth: () => 40,
              };
              wrapper.instance().handleSectionRendered({
                measurementCache,
                containerWidth: 500,
              });
            });
            it('should use set max width as width', () => {
              expect(wrapper.state('width')).toBe(500);
            });
            it('should set the remaining width', () => {
              // width - columnWidths - scrollbarWidth = 500 - (10 * 40) - 20 = 80
              expect(wrapper.state('remainingWidth')).toBe(80);
            });
          });
          describe('when not vertically scrollable', () => {
            beforeEach(() => {
              props = createTestProps({
                columns: [
                  ...Array.from({ length: 8 }).map(() => ({
                    key: 'ID',
                  })),
                  { key: 'flexible1', flexGrow: 1 },
                  { key: 'flexible2', flexGrow: 1 },
                ],
              });
              wrapper = shallow(<BaseTable {...props} />);
              // simulate smaller width from previous measure
              wrapper.setState({ width: 300 });
              measurementCache = {
                rowHeight: () => 10,
                columnWidth: () => 40,
              };
              wrapper.instance().handleSectionRendered({
                measurementCache,
                containerWidth: 500,
              });
            });
            it('should use set max width as width', () => {
              expect(wrapper.state('width')).toBe(500);
            });
            it('should set the remaining width', () => {
              // width - columnWidths = 500 - (10 * 40) - 20 = 100
              expect(wrapper.state('remainingWidth')).toBe(100);
            });
          });
        });
      });
      describe('determining the width of the columns', () => {
        const getMinColumnWidth = () => 50;
        let getColumnWidth;
        describe('with remaining width', () => {
          describe('with flex columns', () => {
            beforeEach(() => {
              props = createTestProps({
                columns: [
                  ...Array.from({ length: 8 }).map(() => ({
                    key: 'ID',
                  })),
                  { key: 'flexible1', flexGrow: 1 },
                  { key: 'flexible2', flexGrow: 1 },
                ],
              });
              wrapper = shallow(<BaseTable {...props} />);
              wrapper.setState({ remainingWidth: 200 });
              getColumnWidth = wrapper
                .instance()
                .getColumnWidth(getMinColumnWidth);
            });
            describe('for flex column', () => {
              it('should return the column width + 100px', () => {
                // minimum column width + remaining width / number of columns
                // = 50 + 200 / 2
                // = 150
                expect(getColumnWidth({ index: 8 })).toBe(150);
              });
            });
            describe('for non-flex column', () => {
              it('should return the minimum column width', () => {
                expect(getColumnWidth({ index: 2 })).toBe(50);
              });
            });
          });
          describe('without flex columns', () => {
            beforeEach(() => {
              wrapper.setState({ remainingWidth: 200 });
              getColumnWidth = wrapper
                .instance()
                .getColumnWidth(getMinColumnWidth);
            });
            it('should return the minimum column width', () => {
              expect(getColumnWidth({ index: 9 })).toBe(50);
            });
          });
        });
        describe('without remaining width', () => {
          beforeEach(() => {
            getColumnWidth = wrapper
              .instance()
              .getColumnWidth(getMinColumnWidth);
          });
          it('should return the minimum column width', () => {
            expect(getColumnWidth({ index: 9 })).toBe(50);
          });
        });
      });
    });
    describe('headerRenderer', () => {
      let headerWrapper;
      describe('when column is sortable', () => {
        beforeEach(() => {
          headerWrapper = shallow(
            wrapper.instance().headerRenderer({
              key: 'id',
              isSortable: true,
              label: <div>{'The label'}</div>,
            })
          );
        });
        it('should render div with onClick handler', () => {
          expect(headerWrapper.find('div').at(1)).toHaveProp(
            'onClick',
            expect.any(Function)
          );
        });
        it('should render SortableHeader', () => {
          expect(headerWrapper).toRender(SortableHeader);
        });
        it('should pass columnKey prop to SortableHeader ', () => {
          expect(headerWrapper.find(SortableHeader)).toHaveProp(
            'columnKey',
            'id'
          );
        });
        it('should pass sortBy prop to SortableHeader ', () => {
          expect(headerWrapper.find(SortableHeader)).toHaveProp(
            'sortBy',
            props.sortBy
          );
        });
        it('should pass sortDirection prop to SortableHeader ', () => {
          expect(headerWrapper.find(SortableHeader)).toHaveProp(
            'sortDirection',
            props.sortDirection
          );
        });
        it('should render given label component', () => {
          expect(headerWrapper.find(SortableHeader)).toContainReact(
            <div>{'The label'}</div>
          );
        });
      });
      describe('when column is not sortable', () => {
        beforeEach(() => {
          headerWrapper = shallow(
            wrapper.instance().headerRenderer({
              isSortable: false,
              label: <div>{'The label'}</div>,
            })
          );
        });
        it('should render given label component', () => {
          expect(headerWrapper).toContainReact(<div>{'The label'}</div>);
        });
      });
    });
    describe('itemRenderer', () => {
      let itemWrapper;
      beforeEach(() => {
        wrapper.instance().columns = [
          {
            key: 'id',
          },
        ];
        itemWrapper = shallow(
          <div>
            {wrapper.instance().itemRenderer({
              columnIndex: 0,
              rowIndex: 1,
              key: 'id',
              parent: { key: 'the-parent???' },
              style: {},
            })}
          </div>
        );
      });
      it('should pass cache prop to CellMeasurer', () => {
        expect(itemWrapper.find('CellMeasurer')).toHaveProp(
          'cache',
          wrapper.instance().cellMeasurerCache
        );
      });
      it('should pass columnIndex prop to CellMeasurer', () => {
        expect(itemWrapper.find('CellMeasurer')).toHaveProp('columnIndex', 0);
      });
      it('should pass parent prop to CellMeasurer', () => {
        expect(itemWrapper.find('CellMeasurer')).toHaveProp('parent', {
          key: 'the-parent???',
        });
      });
      it('should pass rowIndex prop to CellMeasurer', () => {
        expect(itemWrapper.find('CellMeasurer')).toHaveProp('rowIndex', 1);
      });
      it('should render Cell', () => {
        expect(itemWrapper).toRender('Cell');
      });
      it('should render Cell with content of props.itemRenderer', () => {
        expect(itemWrapper.find('Cell')).toContainReact(<div>{'foo'}</div>);
      });
      describe('when onRowClick is defined', () => {
        beforeEach(() => {
          props = createTestProps({ onRowClick: jest.fn() });
          wrapper = shallow(<BaseTable {...props} />);
          wrapper.instance().columns = [
            {
              key: 'id',
            },
          ];
          itemWrapper = shallow(
            <div>
              {wrapper.instance().itemRenderer({
                columnIndex: 0,
                rowIndex: 1,
                key: 'id',
                parent: { key: 'the-parent???' },
                style: {},
              })}
            </div>
          );
        });
        it('should pass onRowClick to inner container', () => {
          expect(
            itemWrapper
              .find('CellMeasurer')
              .find('div')
              .first()
          ).toHaveProp('onClick', expect.any(Function));
        });
        it('should pass onMouseOver to inner container', () => {
          expect(
            itemWrapper
              .find('CellMeasurer')
              .find('div')
              .first()
          ).toHaveProp('onMouseOver', expect.any(Function));
        });
        it('should pass onMouseOut to inner container', () => {
          expect(
            itemWrapper
              .find('CellMeasurer')
              .find('div')
              .first()
          ).toHaveProp('onMouseOut', expect.any(Function));
        });
        describe('when clicking on onClick', () => {
          beforeEach(() => {
            itemWrapper
              .find('CellMeasurer')
              .find('div')
              .first()
              .prop('onClick')({});
          });
          it('should call onRowClick with rowIndex 0', () => {
            expect(props.onRowClick).toHaveBeenCalledWith(
              expect.any(Object),
              0
            );
          });
          describe('when column has an ÎonClick handler', () => {
            beforeEach(() => {
              wrapper.instance().columns = [
                {
                  key: 'id',
                  onClick: jest.fn(),
                },
              ];
              itemWrapper = shallow(
                <div>
                  {wrapper.instance().itemRenderer({
                    columnIndex: 0,
                    rowIndex: 1,
                    key: 'id',
                    parent: { key: 'the-parent???' },
                    style: {},
                  })}
                </div>
              );
              itemWrapper
                .find('CellMeasurer')
                .find('div')
                .first()
                .prop('onClick')({});
            });
            it('should call column onClick with rowIndex 0', () => {
              expect(
                wrapper.instance().columns[0].onClick
              ).toHaveBeenCalledWith(
                expect.objectContaining({
                  rowIndex: 0,
                })
              );
            });
          });
        });
      });
      describe('when rowIndex is 0 (header)', () => {
        beforeEach(() => {
          wrapper.instance().columns = [
            {
              key: 'id',
              isSortable: false,
              label: <div>{'The label'}</div>,
            },
          ];
          itemWrapper = shallow(
            <div>
              {wrapper.instance().itemRenderer({
                columnIndex: 0,
                rowIndex: 0,
                key: 'id',
                parent: { key: 'the-parent???' },
                style: {},
              })}
            </div>
          );
        });
        it('should render Cell with content of headerRenderer', () => {
          expect(itemWrapper.find('Cell')).toContainReact(
            <div>{'The label'}</div>
          );
        });
      });
    });
  });
  describe('lifecycle', () => {
    let props;
    let wrapper;
    describe('componentDidMount', () => {
      beforeEach(() => {
        props = createTestProps({
          columns: [
            { key: '1' },
            { key: '2', isFixed: true },
            { key: '3' },
            { key: '4', isFixed: true },
            { key: '5', isFixed: false },
          ],
        });
        wrapper = shallow(<BaseTable {...props} />);
        wrapper.instance().componentDidMount();
      });
      it('should sort columns by fixed columns', () => {
        expect(wrapper.instance().columns).toEqual([
          { key: '2', isFixed: true },
          { key: '4', isFixed: true },
          { key: '1' },
          { key: '3' },
          { key: '5', isFixed: false },
        ]);
      });
      describe('when registerMeasurementCache is defined', () => {
        beforeEach(() => {
          props = createTestProps({
            registerMeasurementCache: jest.fn(),
          });
          wrapper = shallow(<BaseTable {...props} />);
          wrapper.instance().componentDidMount();
        });
        it('should call registerMeasurementCache with cache object', () => {
          expect(props.registerMeasurementCache).toHaveBeenCalledWith(
            wrapper.instance().cellMeasurerCache
          );
        });
      });
    });
    describe('componentWillReceiveProps', () => {
      beforeEach(() => {
        props = createTestProps({
          columns: [
            { key: '1' },
            { key: '2', isFixed: true },
            { key: '3' },
            { key: '4', isFixed: true },
            { key: '5', isFixed: false },
          ],
        });
        wrapper = shallow(<BaseTable {...props} />);
        wrapper.instance().multiGrid = {
          measureAllCells: jest.fn(),
          recomputeGridSize: jest.fn(),
        };
        wrapper.instance().handleSectionRendered = jest.fn();
      });
      describe('when columns prop changes', () => {
        beforeEach(() => {
          wrapper.instance().componentWillReceiveProps({
            columns: [
              { key: '1' },
              { key: '2', isFixed: false },
              { key: '3' },
              { key: '4', isFixed: true },
              { key: '5', isFixed: false },
            ],
          });
        });
        it('should sort columns by fixed columns', () => {
          expect(wrapper.instance().columns).toEqual([
            { key: '4', isFixed: true },
            { key: '1' },
            { key: '2', isFixed: false },
            { key: '3' },
            { key: '5', isFixed: false },
          ]);
        });
      });
      describe('when maxWidth prop changes', () => {
        beforeEach(() => {
          wrapper.instance().componentWillReceiveProps({
            maxWidth: 999,
          });
        });
        it('should call handleSectionRendered', () => {
          expect(
            wrapper.instance().handleSectionRendered
          ).toHaveBeenCalledTimes(1);
          expect(wrapper.instance().handleSectionRendered).toHaveBeenCalledWith(
            {
              measurementCache: expect.any(Object),
              containerWidth: 999,
            }
          );
        });
        it('should call recomputeGridSize', () => {
          expect(
            wrapper.instance().multiGrid.recomputeGridSize
          ).toHaveBeenCalledTimes(1);
        });
      });
      describe('when maxHeight prop changes', () => {
        beforeEach(() => {
          wrapper.instance().componentWillReceiveProps({
            maxHeight: 999,
          });
        });
        it('should call handleSectionRendered', () => {
          expect(
            wrapper.instance().handleSectionRendered
          ).toHaveBeenCalledTimes(1);
          expect(wrapper.instance().handleSectionRendered).toHaveBeenCalledWith(
            {
              measurementCache: expect.any(Object),
              containerHeight: 999,
            }
          );
        });
        it('should call recomputeGridSize', () => {
          expect(
            wrapper.instance().multiGrid.recomputeGridSize
          ).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('callbacks', () => {
    let props;
    let wrapper;
    describe('handleChangeSortDirection', () => {
      beforeEach(() => {
        props = createTestProps({
          onSortChange: jest.fn(),
          sortBy: 'id',
          sortDirection: 'ASC',
        });
        wrapper = shallow(<BaseTable {...props} />);
      });
      describe('when previous direction was ASC', () => {
        beforeEach(() => {
          wrapper.instance().handleChangeSortDirection('id');
        });
        it('should call onSortChange with direction DESC', () => {
          expect(props.onSortChange).toHaveBeenCalledWith('id', 'DESC');
        });
      });
      describe('when previous direction was DESC', () => {
        beforeEach(() => {
          props = createTestProps({
            onSortChange: jest.fn(),
            sortBy: 'id',
            sortDirection: 'DESC',
          });
          wrapper = shallow(<BaseTable {...props} />);
        });
        beforeEach(() => {
          wrapper.instance().handleChangeSortDirection('id');
        });
        it('should call onSortChange with direction ASC', () => {
          expect(props.onSortChange).toHaveBeenCalledWith('id', 'ASC');
        });
      });
      describe('when the sorted column changes', () => {
        beforeEach(() => {
          wrapper.instance().handleChangeSortDirection('foo');
        });
        it('should call onSortChange with direction ASC', () => {
          expect(props.onSortChange).toHaveBeenCalledWith('foo', 'ASC');
        });
      });
    });
  });
});
