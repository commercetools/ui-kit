import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.mod.css';

export default class CoolTable extends React.Component {
  static displayName = 'CoolTable';
  static propTypes = {
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
      })
    ).isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
      })
    ).isRequired,
    renderItem: PropTypes.func.isRequired,
    maxHeight: PropTypes.number,
  };
  render() {
    return (
      <div
        className={styles.grid}
        style={{
          gridTemplateColumns: `repeat(${this.props.columns.length}, auto)`,
          maxHeight: this.props.maxHeight
            ? `${this.props.maxHeight + 200}px`
            : '',
          overflowY: 'auto',
        }}
      >
        {this.props.columns.map(column => (
          <div key={column.key} role="column-header" className={styles.header}>
            <strong>{column.label}</strong>
          </div>
        ))}
        {this.props.items.map((item, rowIndex) => (
          <React.Fragment key={item.key}>
            {this.props.columns.map((column, columnIndex) => (
              <div key={`${item.key}/${column.key}`} className={styles.cell}>
                {this.props.renderItem({ item, column, rowIndex, columnIndex })}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    );
  }
}
