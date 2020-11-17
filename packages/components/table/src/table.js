import React from 'react';
import PropTypes from 'prop-types';
import { AutoSizer } from 'react-virtualized';
import { css } from '@emotion/react';
import BaseTable from './base-table';

/* The table shouldn't be greater than 768px on smaller screens,
and should scale according to the height provided by <AutoSizer />
(e.G height > 768) */
const DEFAULT_TABLE_HEIGHT = 768;

/* A wrapper component to allow the <BaseTable /> to fit the remaining
  space of the current view. */
export class Table extends React.PureComponent {
  static displayName = 'Table';

  static propTypes = {
    children: PropTypes.node,
    defaultHeight: PropTypes.number,
    shouldFillRemainingVerticalSpace: PropTypes.bool.isRequired,
  };

  ref = React.createRef();

  componentDidMount() {
    /* The <AutoSizer /> calculates the remaining space of the entire screen.
      Because of that, additional elements inside the container, besides the
      <BaseTable/>, needs to be taken into consideration when calculating
      the actual <BaseTable/> height (= container height - footer height) */
    if (this.props.children) this.footerHeight = this.ref.current.clientHeight;
  }

  renderContent({ height, width }) {
    let tableMaxHeight;

    const {
      children,
      defaultHeight = DEFAULT_TABLE_HEIGHT,
      shouldFillRemainingVerticalSpace,
      ...rest
    } = this.props;

    if (this.props.shouldFillRemainingVerticalSpace) {
      const maxHeight = Math.max(height, defaultHeight);
      const footerHeight = this.props.children ? this.footerHeight : 0;
      tableMaxHeight = maxHeight - footerHeight;
    }

    return (
      <div style={{ width }}>
        <BaseTable
          {...rest}
          maxHeight={tableMaxHeight || defaultHeight}
          maxWidth={width}
        />
        {this.props.children && (
          <div
            ref={this.ref}
            css={css`
              display: flex;
              flex-direction: column;
            `}
          >
            {this.props.children}
          </div>
        )}
      </div>
    );
  }

  render() {
    return (
      <div
        css={css`
          flex-grow: 1;
          flex-shrink: 0;
        `}
      >
        <AutoSizer disableHeight={!this.props.shouldFillRemainingVerticalSpace}>
          {/*
              NOTE: because `AutoSizer` implements `PureComponent`, if we pass
              a reference to a function that does not change, the children will
              not be re-rendered. To always force a re-rendering we pass as
              `children` an arrow function, which will create a new function
              every time.
            */}
          {(...args) => this.renderContent(...args)}
        </AutoSizer>
      </div>
    );
  }
}

Table.defaultProps = {
  shouldFillRemainingVerticalSpace: false,
};

Table.propTypes = {
  shouldFillRemainingVerticalSpace: PropTypes.bool,
};

export default Table;
