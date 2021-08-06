import PropTypes from 'prop-types';
import { useTheme } from '@emotion/react';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import { ClockIcon, CloseIcon } from '@commercetools-uikit/icons';
import Inline from '@commercetools-uikit/spacings-inline';
import AccessibleButton from '@commercetools-uikit/accessible-button';
import {
  getClearSectionStyles,
  getClockIconContainerStyles,
  getInputContainerStyles,
  getTimeInputStyles,
  StyledClockIconContainer,
  StyledInputContainer,
} from './time-input-body.styles';

export const ClearSection = (props) => {
  const theme = useTheme();
  return (
    <AccessibleButton
      theme={theme}
      css={getClearSectionStyles(theme)}
      label="clear"
      aria-label="clear"
      onClick={props.onClear}
      hasError={props.hasError}
    >
      <CloseIcon size="medium" />
    </AccessibleButton>
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
      <StyledInputContainer css={getInputContainerStyles(props, theme)}>
        <input
          css={getTimeInputStyles(props, theme)}
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
          {...filterDataAttributes(props)}
          /* ARIA */
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
          css={getClockIconContainerStyles(props, theme)}
          htmlFor={props.id}
          data-toggle
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
  horizontalConstraint: PropTypes.oneOf([
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    'scale',
    'auto',
  ]),
};

export default TimeInputBody;
