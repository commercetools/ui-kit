import React from 'react';
import PropTypes from 'prop-types';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import withMouseOverState from '../../../hocs/with-mouse-over-state';
import { ClockIcon, CloseIcon } from '../../icons';
import Spacings from '../../spacings';
import {
  getClearSectionStyles,
  getClockIconContainerStyles,
  getTimeInputStyles,
  getInputContainerStyles,
} from './time-input-body.styles';

const getIconTheme = (isDisabled, isMouseOver) => {
  if (isDisabled) return 'grey';
  if (isMouseOver) return 'orange';
  return 'black';
};

export const ClearSection = props => (
  <div
    onClick={props.isDisabled || props.isReadOnly ? undefined : props.onClear}
    css={theme => getClearSectionStyles(props, theme)}
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
  isReadOnly: PropTypes.bool,
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
    autoComplete: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    isAutofocussed: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isReadOnly: PropTypes.bool,
    hasError: PropTypes.bool,
    onClear: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    placeholder: PropTypes.string,
    horizontalConstraint: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'scale']),
  };

  render() {
    return (
      <Spacings.Inline alignItems="center">
        <div css={getInputContainerStyles()}>
          <input
            id={this.props.id}
            name={this.props.name}
            autoComplete={this.props.autoComplete}
            css={theme => getTimeInputStyles(this.props, theme)}
            placeholder={this.props.placeholder}
            autoFocus={this.props.isAutofocussed}
            disabled={this.props.isDisabled}
            readOnly={this.props.isReadOnly}
            value={this.props.value}
            onChange={this.props.onChange}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
            {...filterDataAttributes(this.props)}
            /* ARIA */
            role="textbox"
            aria-readonly={this.props.isReadOnly}
            contentEditable={!this.props.isReadOnly}
          />
          <ClearSectionWithMouseOverState
            isDisabled={this.props.isDisabled}
            hasError={this.props.hasError}
            isReadOnly={this.props.isReadOnly}
            onClear={this.props.onClear}
          />
          <label
            htmlFor={this.props.id}
            data-toggle
            css={theme => getClockIconContainerStyles(this.props, theme)}
          >
            <ClockIcon theme={this.props.isDisabled ? 'grey' : 'black'} />
          </label>
        </div>
      </Spacings.Inline>
    );
  }
}
