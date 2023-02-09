// TODO: @redesign cleanup
import { forwardRef, type KeyboardEvent, type MouseEvent } from 'react';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import { ClockIcon, CloseIcon } from '@commercetools-uikit/icons';
import Inline from '@commercetools-uikit/spacings-inline';
import AccessibleButton from '@commercetools-uikit/accessible-button';
import { useTheme } from '@commercetools-uikit/design-system';
import {
  getClearSectionStyles,
  getClockIconContainerStyles,
  getInputContainerStyles,
  getTimeInputStyles,
  StyledClockIconContainer,
  StyledInputContainer,
} from './time-input-body.styles';

import type { TTimeInputProps } from './time-input';

type TTimeInputBodyProps = TTimeInputProps & {
  onClear: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => void;
};

type TClearSectionProps = {
  isDisabled?: boolean;
  hasError?: boolean;
  isReadOnly?: boolean;
  onClear: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => void;
};

export const ClearSection = (props: TClearSectionProps) => {
  return (
    <AccessibleButton
      css={getClearSectionStyles()}
      label="clear"
      aria-label="clear"
      onClick={props.onClear}
    >
      <CloseIcon size="medium" />
    </AccessibleButton>
  );
};

ClearSection.displayName = 'ClearSection';

const TimeInputBody = forwardRef<HTMLInputElement, TTimeInputBodyProps>(
  (props, ref) => {
    const { isNewTheme } = useTheme();
    return (
      <Inline alignItems="center">
        <StyledInputContainer css={getInputContainerStyles(props, isNewTheme)}>
          <input
            ref={ref}
            css={getTimeInputStyles(props)}
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
            {...(!props.isReadOnly
              ? {
                  'aria-invalid': props['aria-invalid'],
                  'aria-errormessage': props['aria-errormessage'],
                }
              : {})}
          />

          {!props.isDisabled && !props.isReadOnly && Boolean(props.value) && (
            <ClearSection
              isDisabled={props.isDisabled}
              hasError={props.hasError}
              isReadOnly={props.isReadOnly}
              onClear={props.onClear}
            />
          )}
          <StyledClockIconContainer
            css={getClockIconContainerStyles(props, isNewTheme)}
            htmlFor={props.id}
            data-toggle
          >
            <ClockIcon
              color={
                props.isDisabled || props.isReadOnly || isNewTheme
                  ? 'neutral60'
                  : 'solid'
              }
            />
          </StyledClockIconContainer>
        </StyledInputContainer>
      </Inline>
    );
  }
);
TimeInputBody.displayName = 'TimeInputBody';

export default TimeInputBody;
