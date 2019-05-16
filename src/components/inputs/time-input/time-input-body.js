import React from 'react';
import PropTypes from 'prop-types';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import { ClockIcon, CloseIcon } from '../../icons';
import Spacings from '../../spacings';
import {
  StyledClearSection,
  StyledClockIconContainer,
  StyledInput,
  StyledInputContainer,
} from './time-input-body.styles';

const getIconTheme = (isDisabled, isMouseOver) => {
  if (isDisabled) return 'grey';
  if (isMouseOver) return 'orange';
  return 'black';
};

export const ClearSection = props => (
  <StyledClearSection
    onClick={props.isDisabled || props.isReadOnly ? undefined : props.onClear}
    isReadOnly={props.isReadOnly}
    hasError={props.hasError}
    isDisabled={props.isDisabled}
  >
    {!props.isDisabled && (
      <CloseIcon
        size="medium"
        theme={getIconTheme(props.isDisabled, props.isMouseOver)}
      />
    )}
  </StyledClearSection>
);

ClearSection.displayName = 'ClearSection';
ClearSection.propTypes = {
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  hasError: PropTypes.bool,
  isMouseOver: PropTypes.bool.isRequired,
  onClear: PropTypes.func,
};

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
        <StyledInputContainer
          isDisabled={this.props.isDisabled}
          isReadOnly={this.props.isReadOnly}
        >
          <StyledInput
            id={this.props.id}
            name={this.props.name}
            autoComplete={this.props.autoComplete}
            placeholder={this.props.placeholder}
            autoFocus={this.props.isAutofocussed}
            disabled={this.props.isDisabled}
            readOnly={this.props.isReadOnly}
            value={this.props.value}
            onChange={this.props.onChange}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
            hasError={this.props.hasError}
            {...filterDataAttributes(this.props)}
            /* ARIA */
            role="textbox"
            aria-readonly={this.props.isReadOnly}
            contentEditable={!this.props.isReadOnly}
          />
          <ClearSection
            isDisabled={this.props.isDisabled}
            hasError={this.props.hasError}
            isReadOnly={this.props.isReadOnly}
            onClear={this.props.onClear}
          />
          <StyledClockIconContainer
            htmlFor={this.props.id}
            data-toggle
            isDisabled={this.props.isDisabled}
            isReadOnly={this.props.isReadOnly}
            hasError={this.props.hasError}
          >
            <ClockIcon theme={this.props.isDisabled ? 'grey' : 'black'} />
          </StyledClockIconContainer>
        </StyledInputContainer>
      </Spacings.Inline>
    );
  }
}
