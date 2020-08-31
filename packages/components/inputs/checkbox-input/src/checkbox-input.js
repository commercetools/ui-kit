import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import {
  createSequentialId,
  filterDataAttributes,
  filterAriaAttributes,
  getFieldId,
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
  if (!props.hasError && !props.disabled) {
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
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  position: relative;

  ${hoverStyles}

  &:focus-within ${LabelTextWrapper} {
    outline: auto 2px ${vars.borderColorForInputWhenFocused};
    outline-offset: 3px;
  }
`;

class CheckboxInput extends React.PureComponent {
  static displayName = 'CheckboxInput';
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    isChecked: PropTypes.bool,
    isIndeterminate: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    // This prop forces Checkbox to be rendered in a hovered state (thought isDisabled takes
    // precedence over that). We need that to address a use-case when hovering is comming
    // from somewhere up the hierarchy. There is no need to touch this prop in case
    // all you need is a general highlighting on hover of Checkbox body, which is solved
    // by a corresponding :hover selector in the syles of this component.
    isHovered: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isReadOnly: PropTypes.bool,
    hasError: PropTypes.bool,
    children: PropTypes.node,
  };

  static defaultProps = {
    isChecked: false,
    isDisabled: false,
    hasError: false,
  };

  state = {
    // We generate an id in case no id is provided by the parent to attach the
    // label to the input component.
    id: this.props.id,
  };

  static getDerivedStateFromProps = (props, state) => ({
    id: getFieldId(props, state, sequentialId),
  });

  render() {
    return (
      <Label
        htmlFor={this.state.id}
        hasError={this.props.hasError}
        disabled={this.props.isDisabled}
      >
        <Checkbox
          type="checkbox"
          id={this.state.id}
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.onChange}
          isDisabled={this.props.isDisabled}
          isReadOnly={this.props.isReadOnly}
          isChecked={this.props.isChecked}
          isIndeterminate={this.props.isIndeterminate}
          {...filterDataAttributes(this.props)}
          {...filterAriaAttributes(this.props)}
        />
        <div css={(theme) => getCheckboxWrapperStyles(this.props, theme)}>
          {(() => {
            if (this.props.isIndeterminate)
              return <IndeterminateIcon size="medium" />;
            if (this.props.isChecked) return <CheckedIcon size="medium" />;
            return <UncheckedIcon size="medium" />;
          })()}
        </div>
        {this.props.children && (
          <LabelTextWrapper>
            <Text.Body
              // FIXME: add proper tones when we have disabled/primary in tones
              tone={this.props.isDisabled ? 'secondary' : undefined}
            >
              {this.props.children}
            </Text.Body>
          </LabelTextWrapper>
        )}
      </Label>
    );
  }
}

export default CheckboxInput;
