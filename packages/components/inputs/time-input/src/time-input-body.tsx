import { forwardRef, type KeyboardEvent, type MouseEvent } from 'react';
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

import type { TTimeInputProps } from './time-input';

type TTimeInputBodyProps = TTimeInputProps & {
  onClear: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => void;
};

type TClearSectionProps = {
  isCondensed?: boolean;
  isDisabled?: boolean;
  hasError?: boolean;
  hasWarning?: boolean;
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
      <CloseIcon size={props.isCondensed ? 'small' : 'medium'} />
    </AccessibleButton>
  );
};

ClearSection.displayName = 'ClearSection';

const TimeInputBody = forwardRef<HTMLInputElement, TTimeInputBodyProps>(
  (props, ref) => {
    return (
      <Inline alignItems="center">
        <StyledInputContainer css={getInputContainerStyles(props)}>
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
              isCondensed={props.isCondensed}
              hasError={props.hasError}
              hasWarning={props.hasWarning}
              isReadOnly={props.isReadOnly}
              onClear={props.onClear}
            />
          )}
          <StyledClockIconContainer
            css={getClockIconContainerStyles(props)}
            htmlFor={props.id}
            data-toggle
          >
            <ClockIcon
              color="neutral60"
              size={props.isCondensed ? 'medium' : 'big'}
            />
          </StyledClockIconContainer>
        </StyledInputContainer>
      </Inline>
    );
  }
);
TimeInputBody.displayName = 'TimeInputBody';

export default TimeInputBody;
