import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import withMouseOverState from '../../hocs/with-mouse-over-state';
import { CalendarIcon, ClockIcon, CloseIcon } from '../../icons';
import Spacings from '../../../materials/spacings';
import styles from './date-picker-body.mod.css';

const getIconTheme = (isDisabled, isMouseOver) => {
  if (isDisabled) return 'grey';
  if (isMouseOver) return 'orange';
  return 'black';
};

const getConstraintSyle = horizontalConstraint => {
  switch (horizontalConstraint) {
    case 'xs':
      return styles.constraintXs;
    case 's':
      return styles.constraintS;
    case 'm':
      return styles.constraintM;
    case 'l':
      return styles.constraintL;
    case 'xl':
      return styles.constraintXl;
    case 'scale':
      return styles.constraintScale;
    default:
      return undefined;
  }
};

export const ClearSection = props => (
  <div
    onClick={props.isDisabled ? undefined : props.onClear}
    className={classnames(styles['clear-icon-container'], {
      [styles['icon-container-disabled']]: props.isDisabled,
      [styles.invalid]: props.isInvalid,
    })}
    onMouseOver={props.handleMouseOver}
    onMouseOut={props.handleMouseOut}
  >
    {!props.isDisabled && (
      <CloseIcon
        size="medium"
        theme={getIconTheme(props.isDisabled, props.isMouseOver)}
      />
    )}
  </div>
);
ClearSection.displayName = 'ClearSection';
ClearSection.propTypes = {
  isDisabled: PropTypes.bool,
  isInvalid: PropTypes.bool,
  isMouseOver: PropTypes.bool.isRequired,
  onClear: PropTypes.func,

  // HoC
  handleMouseOut: PropTypes.func.isRequired,
  handleMouseOver: PropTypes.func.isRequired,
};

ClearSection.defaultProps = {
  isInvalid: false,
};

export const ClearSectionWithMouseOverState = withMouseOverState(ClearSection);

export class DatePickerBody extends React.PureComponent {
  static displayName = 'DatePickerBody';

  static propTypes = {
    id: PropTypes.string,
    formattedValue: PropTypes.string,
    isDisabled: PropTypes.bool,
    isInvalid: PropTypes.bool,
    onClearPicker: PropTypes.func,
    placeholder: PropTypes.string,
    horizontalConstraint: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'scale']),
    timeScale: PropTypes.oneOf(['date', 'time', 'datetime']),
    numberOfFormattedValueChars: PropTypes.number,
  };

  static defaultProps = {
    timeScale: 'date',
    isInvalid: false,
    isDisabled: false,
  };

  render() {
    return (
      <Spacings.Inline alignItems="center">
        <div
          className={classnames(
            styles['date-input-container'],
            getConstraintSyle(this.props.horizontalConstraint)
          )}
        >
          <input
            id={this.props.id}
            className={classnames(styles['date-input'], {
              [styles.invalid]: this.props.isInvalid,
            })}
            placeholder={this.props.placeholder}
            disabled={this.props.isDisabled}
            defaultValue={this.props.formattedValue}
            title={this.props.formattedValue}
            data-input
            size={this.props.numberOfFormattedValueChars}
          />
          <ClearSectionWithMouseOverState
            isDisabled={this.props.isDisabled}
            isInvalid={this.props.isInvalid}
            onClear={this.props.onClearPicker}
          />
          <div
            data-toggle
            className={classnames(styles['calendar-icon-container'], {
              [styles['icon-container-disabled']]: this.props.isDisabled,
              [styles.invalid]: this.props.isInvalid,
            })}
          >
            {this.props.timeScale === 'time' ? (
              <ClockIcon theme={this.props.isDisabled ? 'grey' : 'black'} />
            ) : (
              <CalendarIcon theme={this.props.isDisabled ? 'grey' : 'black'} />
            )}
          </div>
        </div>
      </Spacings.Inline>
    );
  }
}
