import crypto from 'crypto';
import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, number } from '@storybook/addon-knobs/react';
import sortBy from 'lodash/sortBy';
import { css } from '@emotion/core';
import Button from '@commercetools-uikit/secondary-button';
import Readme from '../README.md';
import Table from './table';

// Data generator for story

const randomName = (val = 'static') => {
  const random = Math.round(Math.random() * 10);
  return (
    <ul>
      {Array.from({ length: random }).map((_, key) => (
        <li key={key}>{val}</li>
      ))}
    </ul>
  );
};

randomName.displayName = 'randomName';

const generateValue = ({ dynamicWidth, dynamicHeight }) => {
  if (dynamicWidth && dynamicHeight)
    return randomName(
      crypto.randomBytes(Math.round(Math.random() * 30)).toString('base64')
    );
  if (dynamicHeight) return randomName('some value');
  if (dynamicWidth)
    return crypto
      .randomBytes(Math.round(Math.random() * 30))
      .toString('base64');
  return `static value ${Math.floor(Math.random() * 100, 100)}`;
};

const generateItems = (cols, numberOfRows) =>
  Array.from({ length: numberOfRows }).map(() => ({
    id: crypto.randomBytes(Math.round(Math.random() * 30)).toString('base64'),
    ...cols.reduce(
      (acc, col) => ({ ...acc, [col.key]: generateValue(col) }),
      {}
    ),
  }));

storiesOf('Components|Table', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('Table (Deprecating Soon)', () => (
    <Wrapper>
      {(props) => {
        const {
          shouldFillRemainingVerticalSpace,
          numberOfRows,
          defaultHeight,
          cols,
          items,
          onSortChange,
          onRowClick,
          scrollToRow,
          sortKey,
          sortDir,
          width,
          registerMeasurementCache,
          keyMapper,
        } = props;

        if (!cols) return null;

        return (
          <Table
            shouldFillRemainingVerticalSpace={shouldFillRemainingVerticalSpace}
            items={items}
            defaultHeight={defaultHeight}
            columns={cols}
            rowCount={numberOfRows}
            itemRenderer={({ rowIndex, columnKey }) => {
              const item = items[rowIndex];
              return <div>{item[columnKey]}</div>;
            }}
            onRowClick={onRowClick}
            onSortChange={onSortChange}
            scrollToRow={scrollToRow}
            sortBy={sortKey}
            sortDirection={sortDir}
            width={width}
            registerMeasurementCache={registerMeasurementCache}
            keyMapper={keyMapper}
          />
        );
      }}
    </Wrapper>
  ));

// Full example
const defaultColProps = {
  isFixed: false,
  dynamicWidth: false,
  dynamicHeight: false,
  isSortable: false,
  isResizable: true,
};

class Wrapper extends React.PureComponent {
  static displayName = 'Wrapper';
  static propTypes = {
    children: PropTypes.func.isRequired,
  };

  state = (() => {
    const cols = [
      { key: 'name', label: 'Name', ...defaultColProps },
      { key: 'column-1', label: 'Column 1', ...defaultColProps },
      { key: 'column-2', label: 'Column 2', ...defaultColProps },
    ];
    const items = generateItems(cols, number('numberOfRows', 50));

    return {
      cols,
      width: null,
      items,
      sortDirection: undefined,
      sortedItems: items,
      onRowClick: false,
    };
  })();

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps() {
    this.handleApplyCols(this.state.cols);
  }

  handleChange = (e) => {
    const items = this.state.items;
    if (e.target.name === 'onRowClick') {
      return this.setState({
        onRowClick: !this.state.onRowClick,
      });
    }
    return this.setState({
      items,
      sortedItems: items,
      [e.target.name]: e.target.value,
    });
  };

  handleColChange = (e, index) => {
    let val = e.target.value;
    if (typeof this.state.cols[index][e.target.name] === 'boolean')
      val = e.target.checked;
    if (e.target.name === 'flexGrow') val = e.target.checked ? 1 : 0;
    const cols = [...this.state.cols];
    cols[index] = {
      ...this.state.cols[index],
      [e.target.name]: val,
    };
    this.handleApplyCols(cols);
  };

  handleApplyCols = (cols) => {
    const items = generateItems(cols, number('numberOfRows', 50));
    this.setState({
      sortedItems: items,
      cols,
    });
  };

  onSortChange = (columnKey, sortDirection) => {
    const sortedItems = sortBy(this.state.sortedItems, columnKey);
    if (sortDirection === 'DESC') sortedItems.reverse();
    this.setState({ sortedItems, sortKey: columnKey, sortDirection });
  };

  handleAddColumn = () => {
    const numberOfCols = this.state.cols.length;
    this.handleApplyCols([
      ...this.state.cols,
      {
        key: `column-${numberOfCols}`,
        label: `Column ${numberOfCols}`,
        ...defaultColProps,
      },
    ]);
  };

  handleRemoveColumn = (index) => {
    this.setState({
      cols: [
        ...this.state.cols.slice(0, index),
        ...this.state.cols.slice(index + 1),
      ],
    });
  };

  render() {
    return (
      <div
        css={css`
          overflow: 'auto',
          height: '100vh',
          display: 'flex',
          flex-direction: column;
        `}
      >
        <div
          css={css`
            padding: 20px 0 0 20px;
          `}
        >
          <h4>{'columns'}</h4>
          {this.state.cols.map((col, colIndex) => (
            <div
              key={colIndex}
              css={css`
                border: 1px solid #ccc;
                border-radius: 10px;
                padding: 10px;
                margin: 5px;
                display: inline-block;
                position: relative;
              `}
            >
              <div>
                <Button
                  onClick={() => this.handleRemoveColumn(colIndex)}
                  label="Remove Column"
                />
              </div>
              <div>
                {'key'}
                <input
                  type="text"
                  name="key"
                  value={col.key}
                  onChange={(e) => this.handleColChange(e, colIndex)}
                />
              </div>
              <div>
                {'label'}
                <input
                  type="text"
                  name="label"
                  value={col.label}
                  onChange={(e) => this.handleColChange(e, colIndex)}
                />
              </div>
              <div>
                {'isFixed'}
                <input
                  type="checkbox"
                  name="isFixed"
                  checked={col.isFixed}
                  label="Fixed"
                  onChange={(e) => this.handleColChange(e, colIndex)}
                />
              </div>
              <div>
                {'flexGrow'}
                <input
                  type="checkbox"
                  name="flexGrow"
                  checked={col.flexGrow === 1}
                  label="Flex Grow"
                  onChange={(e) => this.handleColChange(e, colIndex)}
                />
              </div>
              <div>
                {'dynamicWidth'}
                <input
                  type="checkbox"
                  name="dynamicWidth"
                  checked={col.dynamicWidth}
                  label="Dynamic Width"
                  onChange={(e) => this.handleColChange(e, colIndex)}
                />
              </div>
              <div>
                {'dynamicHeight'}
                <input
                  type="checkbox"
                  name="dynamicHeight"
                  checked={col.dynamicHeight}
                  label="Dynamic Height"
                  onChange={(e) => this.handleColChange(e, colIndex)}
                />
              </div>
              <div>
                {'isSortable'}
                <input
                  type="checkbox"
                  name="isSortable"
                  checked={col.isSortable}
                  label="Sortable"
                  onChange={(e) => this.handleColChange(e, colIndex)}
                />
              </div>
            </div>
          ))}
        </div>
        <div
          css={css`
            padding: 20px;
          `}
        >
          <Button onClick={this.handleAddColumn} label="Add Column" />
        </div>
        <div
          css={css`
            width: 400px;
            padding: 20px;
            display: inline-block;
          `}
        >
          {'onRowClick'}
          <input
            type="checkbox"
            name="onRowClick"
            checked={this.state.onRowClick}
            label="has Link"
            onChange={this.handleChange}
          />
        </div>
        <div
          css={css`
            padding: 20px;
            flex-grow: 1;
            display: flex;
          `}
        >
          {this.props.children({
            shouldFillRemainingVerticalSpace: boolean(
              'shouldFillRemainingVerticalSpace',
              false
            ),
            // eslint-disable-next-line no-alert
            onRowClick: this.state.onRowClick ? () => alert('clicked!') : null,
            numberOfRows: number('numberOfRows', 50),
            defaultHeight: number('defaultHeight (default 768)', 768),
            cols: this.state.cols,
            items: this.state.sortedItems,
            onSortChange: this.onSortChange,
            scrollToRow: number('scrollToRow', undefined),
            sortKey: this.state.sortKey,
            sortDir: this.state.sortDirection,
            width: this.state.width,
            registerMeasurementCache: this.registerMeasurementCache,
            keyMapper: (rowIndex, columnIndex) => {
              const column = this.state.cols[columnIndex];
              // apparently it can happen that cell measurer calls this function with
              // an index that is out of bounds
              if (!column) return undefined;

              if (rowIndex === 0) {
                return column.key;
              }
              const row = this.state.sortedItems[rowIndex - 1];
              if (!row) return undefined;
              const value = row[column.key];
              return `${row.id}-${column.key}-${value}`;
            },
          })}
        </div>
      </div>
    );
  }
}
