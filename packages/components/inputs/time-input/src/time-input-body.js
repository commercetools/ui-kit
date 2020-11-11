import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from 'emotion-theming';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import { ClockIcon, CloseIcon } from '@commercetools-uikit/icons';
import Inline from '@commercetools-uikit/spacings-inline';
import {
  StyledClearSection,
  StyledClockIconContainer,
  StyledInput,
  StyledInputContainer,
} from './time-input-body.styles';

export const ClearSection = (props) => {
  const theme = useTheme();
  return (
    <StyledClearSection
      theme={theme}
      label="clear"
      aria-label="clear"
      onClick={props.onClear}
      hasError={props.hasError}
    >
      <CloseIcon size="medium" />
    </StyledClearSection>
  );
};

ClearSection.displayName = 'ClearSection';
ClearSection.propTypes = {
  hasError: PropTypes.bool,
  onClear: PropTypes.func,
};

const TimeInputBody = (props) => {
  const theme = useTheme();
  return (
    <Inline alignItems="center">
      <StyledInputContainer
        theme={theme}
        isDisabled={props.isDisabled}
        isReadOnly={props.isReadOnly}
        hasError={props.hasError}
      >
        <StyledInput
          theme={theme}
          id={props.id}
          name={props.name}
          autoComplete={props.autoComplete}
          placeholder={props.placeholder}
          autoFocus={props.isAutofocussed}
          disabled={props.isDisabled}
          readOnly={props.isReadOnly}
          value={props.value}
          onChange={props.onChange}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          hasError={props.hasError}
          {...filterDataAttributes(props)}
          /* ARIA */
          role="textbox"
          aria-readonly={props.isReadOnly}
          contentEditable={!props.isReadOnly}
        />

        {!props.isDisabled && !props.isReadOnly && (
          <ClearSection
            isDisabled={props.isDisabled}
            hasError={props.hasError}
            isReadOnly={props.isReadOnly}
            onClear={props.onClear}
          />
        )}
        <StyledClockIconContainer
          theme={theme}
          htmlFor={props.id}
          data-toggle
          isDisabled={props.isDisabled}
          isReadOnly={props.isReadOnly}
          hasError={props.hasError}
        >
          <ClockIcon
            color={props.isDisabled || props.isReadOnly ? 'neutral60' : 'solid'}
          />
        </StyledClockIconContainer>
      </StyledInputContainer>
    </Inline>
  );
};
TimeInputBody.displayName = 'TimeInputBody';
TimeInputBody.propTypes = {
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

export default TimeInputBody;
