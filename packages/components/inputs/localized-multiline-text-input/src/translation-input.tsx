import {
  useState,
  useCallback,
  type ChangeEventHandler,
  type FocusEventHandler,
  type ReactNode,
} from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import FlatButton from '@commercetools-uikit/flat-button';
import { AngleUpIcon } from '@commercetools-uikit/icons';
import Stack from '@commercetools-uikit/spacings-stack';
import { filterDataAttributes, warning } from '@commercetools-uikit/utils';
import { designTokens } from '@commercetools-uikit/design-system';
import {
  MultilineInput,
  messagesMultilineInput,
} from '@commercetools-uikit/input-utils';
import {
  getTextareaStyles,
  getLanguageLabelStyles,
  ToggleButtonWrapper,
} from './translation-input.styles';

interface HTMLLocalizedTextAreaElement extends HTMLTextAreaElement {
  language: string;
}

type TranslationInputProps = {
  /**
   * Indicate if the value entered in the input is invalid.
   */
  'aria-invalid'?: boolean;
  /**
   * HTML ID of an element containing an error message related to the input.
   */
  'aria-errormessage'?: string;
  onChange?: ChangeEventHandler<HTMLLocalizedTextAreaElement>;
  language: string;
  onFocus?: () => void;
  onToggle?: () => void;
  isCollapsed?: boolean;
  hasLanguagesControl?: boolean;
  warning?: ReactNode;
  error?: ReactNode;
  id?: string;
  name?: string;
  autoComplete?: string;
  value: string;
  onBlur?: FocusEventHandler<HTMLLocalizedTextAreaElement>;
  isDisabled?: boolean;
  placeholder?: string;
  hasWarning?: boolean;
  hasError?: boolean;
  isReadOnly?: boolean;
  isAutofocussed?: boolean;
  intl: {
    formatMessage: (messageObject: TMessagesMultilineInput) => string;
  };
};

type TMessagesMultilineInput = {
  id: string;
  description: string;
  defaultMessage: string;
};

const LeftColumn = styled.div`
  flex: 1;
`;

const RightColumn = styled.div`
  position: relative;
  flex: 0;
  display: flex;
  align-items: flex-start;
`;

const Row = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TranslationInput = (props: TranslationInputProps) => {
  const [contentRowCount, setContentRowCount] = useState(0);
  const [firstRowHeight, setFirstRowHeight] = useState(0);

  const handleHeightChange = useCallback(
    (_, rowCount) => {
      setContentRowCount(rowCount);
    },
    [setContentRowCount]
  );

  const calculateFirstRowHeight = useCallback(
    (rowHeight) => {
      setFirstRowHeight(rowHeight);
    },
    [setFirstRowHeight]
  );

  const { onChange } = props;

  const handleChange = useCallback<
    ChangeEventHandler<HTMLLocalizedTextAreaElement>
  >(
    (event) => {
      // We manipulate the event to add the language to the target.
      // That way the users of LocalizedTextInput's onChange can read
      // event.target.language and event.target.value to determine the next value.
      //
      // We only need this information for the story, the MC application code will
      // never need to access the information in such an inconvenient way, as
      // Formik can deal with a name like "foo.en" and sets the value correctly.
      // We can't use this as we aren't guaranteed a name in the story as the user
      // might clear it using the knob, and then we can't parse the language from
      // the input name anymore.
      event.target.language = props.language;
      onChange?.(event);
    },
    [onChange, props.language]
  );

  const { onFocus, onToggle } = props;
  const handleFocus = useCallback(() => {
    // Expand the input on focus
    if (props.isCollapsed) onToggle?.();
    if (onFocus) onFocus();
  }, [props.isCollapsed, onFocus, onToggle]);

  // This checks if the content in the textarea is greater than 38 (one row). If it is, then the toggle button will be shown.
  // This is to prevent the toggle button from showing when there is not enough content to expand/collapse.
  const contentExceedsShownRows = contentRowCount > firstRowHeight;

  const shouldToggleButtonTakeSpace =
    /*
      - if hasLanguagesControl and there are no errors/warnings to display
      - then the toggleButton is absolutely positioned
      This is because the toggle button is placed next to the LocalizedInputToggle without being siblings in the DOM.
      If there is a error or warning showing,
      then it can be placed statically because it will then be a sibling to the error/warning message
      and LocalizedInputToggle is placed below the errors/warnings.
    */
    (!props.isCollapsed &&
      contentExceedsShownRows &&
      !props.hasLanguagesControl) ||
    props.error ||
    props.warning;

  if (!props.isReadOnly) {
    warning(
      typeof props.onChange === 'function',
      'LocalizedMultilineTextInput/TranslationInput: "onChange" is required when isReadOnly is not true'
    );
  }

  return (
    <Stack scale="xs">
      <div
        key={props.language}
        css={css`
          width: 100%;
          position: relative;
          display: flex;
        `}
      >
        <label htmlFor={props.id} css={getLanguageLabelStyles(props)}>
          {props.language.toUpperCase()}
        </label>
        <MultilineInput
          id={props.id}
          name={props.name}
          autoComplete={props.autoComplete}
          value={props.value}
          onChange={handleChange}
          onHeightChange={handleHeightChange}
          calculateFirstRowHeight={calculateFirstRowHeight}
          onBlur={props.onBlur}
          onFocus={handleFocus}
          isDisabled={props.isDisabled}
          placeholder={props.placeholder}
          css={getTextareaStyles(props)}
          hasError={props.hasError}
          hasWarning={props.hasWarning}
          isReadOnly={props.isReadOnly}
          isAutofocussed={props.isAutofocussed}
          isOpen={!props.isCollapsed}
          {...filterDataAttributes(props)}
          /* ARIA */
          aria-invalid={props['aria-invalid']}
          aria-errormessage={props['aria-errormessage']}
        />
      </div>
      <Row
        // NOTE: applying this style withing the `styled` component results in the production
        // bundle to apply the style in the wrong order.
        // For instance, we need to override the marging of the spacing component, which also
        // uses `!important`.
        // Anyway, apparently by passing the style as a `css` prop to the `styled` component
        // does the trick.
        // TODO: revisit the logic and the implementation to maybe avoid having to apply this style.
        css={css`
          margin-top: ${shouldToggleButtonTakeSpace
            ? 'inherit'
            : '0px !important'};
        `}
      >
        {(() => {
          if (props.error)
            return (
              <LeftColumn>
                <div>{props.error}</div>
              </LeftColumn>
            );
          if (props.warning)
            return (
              <LeftColumn>
                <div>{props.warning}</div>
              </LeftColumn>
            );
          return null;
        })()}
        {!props.isCollapsed && contentExceedsShownRows && (
          <>
            <LeftColumn />
            <RightColumn>
              <ToggleButtonWrapper
                css={[
                  !shouldToggleButtonTakeSpace &&
                    css`
                      position: absolute;
                      top: 0;
                      right: 0;
                      margin-top: ${designTokens.spacing10};
                    `,
                ]}
              >
                <FlatButton
                  onClick={props.onToggle}
                  isDisabled={props.isDisabled}
                  label={props.intl.formatMessage(
                    messagesMultilineInput.collapse
                  )}
                  icon={<AngleUpIcon size="small" />}
                />
              </ToggleButtonWrapper>
            </RightColumn>
          </>
        )}
      </Row>
    </Stack>
  );
};

TranslationInput.displayName = 'TranslationInput';

export default TranslationInput;
