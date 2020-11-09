import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import {
  createSequentialId,
  filterDataAttributes,
  filterAriaAttributes,
} from '@commercetools-uikit/utils';
import Text from '@commercetools-uikit/text';
import {
  IndeterminateIcon,
  CheckedIcon,
  UncheckedIcon,
} from '../../../../../src/components/internals/icons';
import { getCheckboxWrapperStyles } from './checkbox-input.styles';
import Checkbox from './checkbox';

const sequentialId = createSequentialId('checkbox-input-');

const hoverStyles = (props) => {
  if (!props.hasError && !props.readOnly && !props.disabled) {
    return css`
      &:hover svg [id$='borderAndContent'] > [id$='border'] {
        stroke: ${vars.borderColorForInputWhenFocused};
      }
    `;
  }
  return css``;
};

const LabelTextWrapper = styled.div`
  margin-left: ${vars.spacingS};
  outline: none;
  border-radius: ${vars.borderRadiusForTag};
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: ${(props) => {
    if (props.disabled) return 'not-allowed';
    if (props.readOnly) return 'default';
    return 'pointer';
  }};
  position: relative;

  ${hoverStyles}

  &:focus-within ${LabelTextWrapper} {
    box-shadow: 0 0 0 2px ${vars.borderColorForInputWhenFocused};
  }
`;

const CheckboxInput = (props) => {
  // We generate an id in case no id is provided by the parent to attach the
  // label to the input component.
  const id = props.id || sequentialId();
  const theme = useTheme();
  return (
    <Label
      htmlFor={id}
      hasError={props.hasError}
      disabled={props.isDisabled}
      readOnly={props.isReadOnly}
    >
      <Checkbox
        type="checkbox"
        id={id}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        isDisabled={props.isDisabled}
        isReadOnly={props.isReadOnly}
        isChecked={props.isChecked}
        isIndeterminate={props.isIndeterminate}
        {...filterDataAttributes(props)}
        {...filterAriaAttributes(props)}
      />
      <div css={getCheckboxWrapperStyles(props, theme)}>
        {(() => {
          if (props.isIndeterminate) return <IndeterminateIcon size="medium" />;
          if (props.isChecked) return <CheckedIcon size="medium" />;
          return <UncheckedIcon size="medium" />;
        })()}
      </div>
      {props.children && (
        <LabelTextWrapper
          // To allow focusing the Label in readOnly mode, because the checkbox gets disabled and therefore unfocusable
          tabIndex={props.isReadOnly ? 0 : -1}
        >
          <Text.Body
            as="span"
            // FIXME: add proper tones when we have disabled/primary in tones
            tone={props.isDisabled ? 'secondary' : undefined}
          >
            {props.children}
          </Text.Body>
        </LabelTextWrapper>
      )}
    </Label>
  );
};

CheckboxInput.displayName = 'CheckboxInput';
CheckboxInput.propTypes = {
  /**
   * Used as HTML id attribute. An id is auto-generated when it is not specified.
   */
  id: PropTypes.string,
  /**
   * Used as HTML name attribute of the input component
   */
  name: PropTypes.string,
  /**
   * Value of the input component.
   */
  value: PropTypes.string,
  /**
   * The checked property sets the checked state of the checkbox.
   */
  isChecked: PropTypes.bool,
  /**
   * If `true`, this state is shown as a dash in the checkbox, and indicates that its state is neither checked nor unchecked.
   * This is most often used when the checkbox is tied to a collection of items in mixed states (E.g nested checkboxes).
   * This takes precedence visually in case `isChecked` is marked as `true`
   */
  isIndeterminate: PropTypes.bool,
  /**
   *  Will be triggered whenever an `CheckboxInput` is clicked. Called with `event`
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Forces CheckboxInput to be rendered in a hovered state.
   * Needed for cases when hovered appearance should be triggered by the parent component and not the CheckboxInput itself.
   * CheckboxInput is capable of handling it's own hovering without the need to pass this prop.
   */
  isHovered: PropTypes.bool,
  /**
   * Disables the CheckboxInput
   */
  isDisabled: PropTypes.bool,
  /**
   * Makes the CheckboxInput readonly
   */
  isReadOnly: PropTypes.bool,
  /**
   * Indicates that the checkbox has an error
   */
  hasError: PropTypes.bool,
  /**
   * The descriptive text of the CheckboxInput, used as its label.
   */
  children: PropTypes.node,
};

CheckboxInput.defaultProps = {
  isChecked: false,
  isDisabled: false,
  hasError: false,
};

export default CheckboxInput;
