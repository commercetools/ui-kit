// TODO: @redesign cleanup
import type { ChangeEventHandler, ReactNode } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { designTokens, useTheme } from '@commercetools-uikit/design-system';
import { createSequentialId } from '@commercetools-uikit/utils';
import { IndeterminateIcon, CheckedIcon } from './icons';
import Checkbox from './checkbox';

const sequentialId = createSequentialId('checkbox-input-');

export type TCheckboxProps = {
  /**
   * Used as HTML id attribute. An id is auto-generated when it is not specified.
   */
  id?: string;
  /**
   * Used as HTML name attribute of the input component
   */
  name?: string;
  /**
   * Value of the input component.
   */
  value?: string;
  /**
   * The checked property sets the checked state of the checkbox.
   */
  isChecked?: boolean;
  /**
   * If `true`, this state is shown as a dash in the checkbox, and indicates that its state is neither checked nor unchecked.
   * This is most often used when the checkbox is tied to a collection of items in mixed states (E.g nested checkboxes).
   * This takes precedence visually in case `isChecked` is marked as `true`
   */
  isIndeterminate?: boolean;
  /**
   *  Will be triggered whenever an `CheckboxInput` is clicked. Called with `event`
   */
  onChange: ChangeEventHandler<HTMLInputElement>;
  /**
   * Forces CheckboxInput to be rendered in a hovered state.
   * Needed for cases when hovered appearance should be triggered by the parent component and not the CheckboxInput itself.
   * CheckboxInput is capable of handling it's own hovering without the need to pass this prop.
   */
  isHovered?: boolean;
  /**
   * Disables the CheckboxInput
   */
  isDisabled?: boolean;
  /**
   * Makes the CheckboxInput readonly
   */
  isReadOnly?: boolean;
  /**
   * Indicates that the checkbox has an error
   */
  hasError?: boolean;
  /**
   * The descriptive text of the CheckboxInput, used as its label.
   */
  children?: ReactNode;
};

type TLabelProps = Pick<
  TCheckboxProps,
  | 'hasError'
  | 'isDisabled'
  | 'isReadOnly'
  | 'isChecked'
  | 'isIndeterminate'
  | 'isHovered'
>;

const defaultProps: Pick<
  TCheckboxProps,
  'isChecked' | 'isDisabled' | 'hasError'
> = {
  isChecked: false,
  isDisabled: false,
  hasError: false,
};

const getBorderColor = (props: TLabelProps) => {
  if (props.hasError) {
    return designTokens.borderColorForCheckboxInputIconWhenError;
  }
  if (props.isDisabled) {
    return designTokens.borderColorForCheckboxInputIconWhenDisabled;
  }
  if (props.isReadOnly) {
    return designTokens.borderColorForCheckboxInputIconWhenReadonly;
  }
  return designTokens.borderColorForCheckboxInputIcon;
};

const getBackgroundColor = (props: TLabelProps) => {
  if (props.isChecked || props.isIndeterminate) {
    if (props.hasError) {
      return designTokens.backgroundColorForCheckboxInputIconWhenError;
    }
    if (props.isDisabled) {
      return designTokens.backgroundColorForCheckboxInputIconWhenDisabled;
    }
    if (props.isReadOnly) {
      return designTokens.backgroundColorForCheckboxInputIconWhenReadonly;
    }
    return designTokens.backgroundColorForCheckboxInputIcon;
  }
  return designTokens.colorSurface;
};

const getTextColor = (props: TLabelProps) => {
  if (props.hasError) {
    return designTokens.fontColorForCheckboxInputLabelWhenError;
  }
  if (props.isDisabled) {
    return designTokens.fontColorForCheckboxInputLabelWhenDisabled;
  }
  if (props.isReadOnly) {
    return designTokens.fontColorForCheckboxInputLabelWhenReadonly;
  }
  return designTokens.fontColorForCheckboxInputLabel;
};

const LabelTextWrapper = styled.div<TLabelProps>`
  margin-left: calc(
    ${designTokens.spacing20} - ${designTokens.borderWidthForCheckboxInputIcon}
  );
  outline: none;
  border-radius: ${designTokens.borderRadiusForTag};

  font-size: ${designTokens.fontSizeForTextAsBody};
  line-height: ${designTokens.lineHeightForTextAsBody};
  font-weight: ${designTokens.fontWeightForTextAsBody};
  color: ${(props) => getTextColor(props)};
`;

const Label = styled.label<TLabelProps>`
  display: flex;
  align-items: center;
  cursor: ${(props) => {
    if (props.isDisabled) return 'not-allowed';
    if (props.isReadOnly) return 'default';
    return 'pointer';
  }};
  position: relative;

  &:focus-within ${LabelTextWrapper} {
    box-shadow: 0 0 0 2px ${designTokens.borderColorForInputWhenFocused};
  }
`;

const CheckboxIcon = (props: TLabelProps) => {
  const { isNewTheme, themedValue } = useTheme();
  const isDisabledOrReadOnlyState = props.isDisabled || props.isReadOnly;
  const isDefaultState = !(props.hasError || isDisabledOrReadOnlyState);
  const canForcedHoverEffect = props.isHovered && !isDisabledOrReadOnlyState;
  return (
    <div
      css={[
        css`
          width: ${themedValue('auto', '26px')};
          height: ${themedValue('auto', '26px')};
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: ${designTokens.borderRadius6};
          &:hover {
            background-color: ${isDisabledOrReadOnlyState
              ? 'unset'
              : designTokens.backgroundColorForCheckboxInputIconWhenHovered};
          }
        `,
        canForcedHoverEffect &&
          css`
            background-color: ${designTokens.backgroundColorForCheckboxInputIconWhenHovered};
          `,
      ]}
    >
      <div
        css={[
          css`
            border-width: ${designTokens.borderWidthForCheckboxInputIcon};
            border-radius: ${designTokens.borderRadius2};
            border-color: ${getBorderColor(props)};
            border-style: solid;
            background-color: ${getBackgroundColor(props)};
            padding: 1px;
            width: ${themedValue('16px', '18px')};
            height: ${themedValue('16px', '18px')};
            display: flex;
            align-items: center;
            justify-content: center;

            svg > path[stroke] {
              stroke: ${themedValue(
                designTokens.colorPrimary,
                designTokens.colorSurface
              )};
            }
          `,
          !isNewTheme &&
            css`
              svg > path[fill] {
                fill: ${getTextColor(props)};
              }
              svg > path[stroke] {
                stroke: ${getTextColor(props)};
              }
            `,
          !isNewTheme &&
            isDefaultState &&
            css`
              svg > path[fill] {
                fill: ${designTokens.colorPrimary};
              }
              svg > path[stroke] {
                stroke: ${designTokens.colorPrimary};
              }
              &:hover {
                border-color: ${isDisabledOrReadOnlyState
                  ? 'unset'
                  : designTokens.colorPrimary};
              }
            `,
          !isNewTheme &&
            canForcedHoverEffect &&
            css`
              border-color: ${designTokens.colorPrimary};
            `,
        ]}
      >
        {(() => {
          if (props.isIndeterminate)
            return (
              <IndeterminateIcon
                color={themedValue('primary', 'surface')}
                size="scale"
              />
            );
          if (props.isChecked)
            return (
              <CheckedIcon
                color={themedValue('primary', 'surface')}
                size="scale"
              />
            );
          return null;
        })()}
      </div>
    </div>
  );
};

const CheckboxInput = (props: TCheckboxProps) => {
  // We generate an id in case no id is provided by the parent to attach the
  // label to the input component.
  const id = props.id || sequentialId();
  return (
    <Label
      htmlFor={id}
      hasError={props.hasError}
      isDisabled={props.isDisabled}
      isReadOnly={props.isReadOnly}
      isChecked={props.isChecked}
      isHovered={props.isHovered}
      isIndeterminate={props.isIndeterminate}
    >
      <Checkbox {...props} id={id} />
      <CheckboxIcon
        hasError={props.hasError}
        isDisabled={props.isDisabled}
        isReadOnly={props.isReadOnly}
        isChecked={props.isChecked}
        isHovered={props.isHovered}
        isIndeterminate={props.isIndeterminate}
      />
      {props.children && (
        <LabelTextWrapper
          hasError={props.hasError}
          isDisabled={props.isDisabled}
          isReadOnly={props.isReadOnly}
          isChecked={props.isChecked}
          isHovered={props.isHovered}
          isIndeterminate={props.isIndeterminate}
          // To allow focusing the Label in readOnly mode, because the checkbox gets disabled and therefore unfocusable
          tabIndex={props.isReadOnly ? 0 : -1}
        >
          {props.children}
        </LabelTextWrapper>
      )}
    </Label>
  );
};

CheckboxInput.displayName = 'CheckboxInput';
CheckboxInput.defaultProps = defaultProps;

export default CheckboxInput;
