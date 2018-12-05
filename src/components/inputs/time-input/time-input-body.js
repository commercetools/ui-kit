import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import withMouseOverState from '../../../hocs/with-mouse-over-state';
import { ClockIcon, CloseIcon } from '../../icons';
import Spacings from '../../spacings';
import styles from './time-input-body.mod.css';

const getIconTheme = (isDisabled, isMouseOver) => {
  if (isDisabled) return 'grey';
  if (isMouseOver) return 'orange';
  return 'black';
};

export const ClearSection = props => (
  <div
    onClick={props.isDisabled ? undefined : props.onClear}
    className={classnames(styles['clear-icon-container'], {
      [styles['icon-container-disabled']]: props.isDisabled,
      [styles.error]: props.hasError,
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
  hasError: PropTypes.bool,
  isMouseOver: PropTypes.bool.isRequired,
  onClear: PropTypes.func,

  // HoC
  handleMouseOut: PropTypes.func.isRequired,
  handleMouseOver: PropTypes.func.isRequired,
};

export const ClearSectionWithMouseOverState = withMouseOverState(ClearSection);

export default class TimeInputBody extends React.Component {
  static displayName = 'TimeInputBody';

  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    isAutofocussed: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isReadOnly: PropTypes.bool,
    hasError: PropTypes.bool,
    onClear: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    horizontalConstraint: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'scale']),
  };

  render() {
    return (
      <Spacings.Inline alignItems="center">
        <div className={classnames(styles['time-input-container'])}>
          <input
            id={this.props.id}
            name={this.props.name}
            className={classnames(styles['time-input'], {
              [styles.error]: this.props.hasError,
            })}
            placeholder={this.props.placeholder}
            autoFocus={this.props.isAutofocussed}
            disabled={this.props.isDisabled}
            value={this.props.value}
            onChange={this.props.onChange}
            onBlur={this.props.onBlur}
            {...filterDataAttributes(this.props)}
            /* ARIA */
            role="textbox"
          />
          <ClearSectionWithMouseOverState
            isDisabled={this.props.isDisabled}
            hasError={this.props.hasError}
            onClear={this.props.onClear}
          />
          <label
            htmlFor={this.props.id}
            data-toggle
            className={classnames(styles['clock-icon-container'], {
              [styles['icon-container-disabled']]: this.props.isDisabled,
              [styles.error]: this.props.hasError,
            })}
          >
            <ClockIcon theme={this.props.isDisabled ? 'grey' : 'black'} />
          </label>
        </div>
      </Spacings.Inline>
    );
  }
}
