import type { ChangeEventHandler, ReactNode } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
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

const getBorderColor = (props: TLabelProps) => {
  if (props.hasError) {
    return designTokens.colorError;
  }
  if (props.isDisabled) {
    return designTokens.colorNeutral;
  }
  if (props.isReadOnly) {
    return designTokens.colorNeutral60;
  }
  if (props.isChecked || props.isIndeterminate) {
    return designTokens.colorPrimary;
  }
  return designTokens.colorNeutral60;
};

const getBackgroundColor = (props: TLabelProps) => {
  if (props.isChecked || props.isIndeterminate) {
    if (props.hasError) {
      return designTokens.colorError;
    }
    if (props.isDisabled) {
      return designTokens.colorNeutral;
    }
    if (props.isReadOnly) {
      return designTokens.colorNeutral60;
    }
    return designTokens.colorPrimary;
  }
  return designTokens.colorSurface;
};

const getTextColor = (props: TLabelProps) => {
  if (props.hasError) {
    return designTokens.colorError;
  }
  if (props.isDisabled) {
    return designTokens.colorNeutral60;
  }
  if (props.isReadOnly) {
    return designTokens.colorNeutral40;
  }
  return designTokens.colorSolid;
};

const LabelTextWrapper = styled.div<TLabelProps>`
  margin-left: calc(${designTokens.spacing20} - ${designTokens.borderWidth2});
  outline: none;
  border-radius: ${designTokens.borderRadius2};

  font-size: ${designTokens.fontSize30};
  line-height: ${designTokens.lineHeight40};
  font-weight: ${designTokens.fontWeight400};
  color: ${(props) => getTextColor(props)};
`;

type TCheckboxIconWrapperProps = {
  width: string;
  height: string;
  isHovered: boolean;
};
const CheckboxIconWrapper = styled.div<TCheckboxIconWrapperProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: ${designTokens.borderRadius6};

  ${(props) =>
    props.isHovered
      ? css`
          background-color: ${designTokens.colorPrimary95};
        `
      : ''}
`;

const CheckboxIcon = (props: TLabelProps) => {
  const isDisabledOrReadOnlyState = props.isDisabled || props.isReadOnly;
  const canForcedHoverEffect = Boolean(
    props.isHovered && !isDisabledOrReadOnlyState
  );
  return (
    <CheckboxIconWrapper
      width="26px"
      height="26px"
      isHovered={canForcedHoverEffect}
    >
      <div
        css={[
          css`
            border-width: ${designTokens.borderWidth2};
            border-radius: ${designTokens.borderRadius2};
            border-color: ${getBorderColor(props)};
            border-style: solid;
            background-color: ${getBackgroundColor(props)};
            padding: 1px;
            width: 18px;
            height: 18px;
            display: flex;
            align-items: center;
            justify-content: center;

            svg > path[stroke] {
              stroke: ${designTokens.colorSurface};
            }
          `,
        ].filter(Boolean)}
      >
        {(() => {
          if (props.isIndeterminate)
            return <IndeterminateIcon color="surface" size="scale" />;
          if (props.isChecked)
            return <CheckedIcon color="surface" size="scale" />;
          return null;
        })()}
      </div>
    </CheckboxIconWrapper>
  );
};

const Label = styled.label<TLabelProps>`
  display: flex;
  align-items: center;
  cursor: ${(props) => {
    if (props.isDisabled) return 'not-allowed';
    if (props.isReadOnly) return 'default';
    return 'pointer';
  }};
  position: relative;

  &:focus-within:has(:focus-visible) ${LabelTextWrapper} {
    box-shadow: 0 0 0 2px ${designTokens.borderColorForInputWhenFocused};
  }

  &:hover ${CheckboxIconWrapper} {
    background-color: ${(props) =>
      props.isDisabled || props.isReadOnly
        ? 'unset'
        : designTokens.colorPrimary95};
  }
`;

const CheckboxInput = ({
  isChecked = false,
  isDisabled = false,
  hasError = false,
  ...props
}: TCheckboxProps) => {
  // We generate an id in case no id is provided by the parent to attach the
  // label to the input component.
  const id = props.id || sequentialId();
  return (
    <Label
      htmlFor={id}
      hasError={hasError}
      isDisabled={isDisabled}
      isReadOnly={props.isReadOnly}
      isChecked={isChecked}
      isHovered={props.isHovered}
      isIndeterminate={props.isIndeterminate}
    >
      <Checkbox
        {...props}
        id={id}
        isChecked={isChecked}
        isDisabled={isDisabled}
        hasError={hasError}
      />
      <CheckboxIcon
        hasError={hasError}
        isDisabled={isDisabled}
        isReadOnly={props.isReadOnly}
        isChecked={isChecked}
        isHovered={props.isHovered}
        isIndeterminate={props.isIndeterminate}
      />
      {props.children && (
        <LabelTextWrapper
          hasError={hasError}
          isDisabled={isDisabled}
          isReadOnly={props.isReadOnly}
          isChecked={isChecked}
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

export default CheckboxInput;
