import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import omit from 'lodash/omit';
import isNil from 'lodash/isNil';
import getFieldId from '../../../utils/get-field-id';
import createSequentialId from '../../../utils/create-sequential-id';
import Text from '../../typography/text';
import Icons from './icons';
import { getCheckboxWrapperStyles } from './checkbox-input.styles';
import Checkbox from './checkbox';
import Spacings from '../../spacings';
import vars from '../../../../materials/custom-properties';
import throwDeprecationWarning from '../../../utils/warn-deprecated-prop';

const sequentialId = createSequentialId('checkbox-input-');

const getCheckboxProps = (props = {}) => ({
  checked: props.checked || props.isChecked,
  disabled: props.disabled || props.isDisabled,
  ...omit(props, [
    'children',
    'hasError',
    'isHovered',
    /* deprecated */
    'isChecked',
    'isDisabled',
  ]),
});

const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  position: relative;
  ${props =>
    !props.hasError &&
    !props.disabled &&
    `  &:hover svg [id$='borderAndContent'] > [id$='border'] {
    stroke: ${vars.borderColorForInputWhenFocused};
  }`}
`;

class CheckboxInput extends React.PureComponent {
  static displayName = 'CheckboxInput';
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    isIndeterminate: PropTypes.bool,
    // This prop forces Checkbox to be rendered in a hovered state (thought isDisabled takes
    // precedence over that). We need that to address a use-case when hovering is comming
    // from somewhere up the hierarchy. There is no need to touch this prop in case
    // all you need is a general highlighting on hover of Checkbox body, which is solved
    // by a corresponding :hover selector in the syles of this component.
    isHovered: PropTypes.bool,
    hasError: PropTypes.bool,
    children: PropTypes.node,
    /* Deprecated Props */
    isChecked(props, propName, componentName, ...rest) {
      if (!isNil(props[propName])) {
        throwDeprecationWarning(
          propName,
          componentName,
          `\n Please use "checked" prop instead.`
        );
      }
      return PropTypes.bool(props, propName, componentName, ...rest);
    },
    isDisabled(props, propName, componentName, ...rest) {
      if (!isNil(props[propName])) {
        throwDeprecationWarning(
          propName,
          componentName,
          `\n Please use "disabled" prop instead.`
        );
      }
      return PropTypes.bool(props, propName, componentName, ...rest);
    },
  };

  static defaultProps = {
    hasError: false,
    isIndeterminate: false,
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
    const checkboxProps = getCheckboxProps(this.props);

    return (
      <Label
        htmlFor={this.state.id}
        disabled={checkboxProps.disabled}
        hasError={this.props.hasError}
      >
        <Checkbox id={this.state.id} {...checkboxProps} />
        <Spacings.Inline alignItems="center" scale="s">
          <div css={theme => getCheckboxWrapperStyles(this.props, theme)}>
            {((
              iconAriaAttributes = { 'aria-hidden': 'true', focusable: 'false' }
            ) => {
              if (this.props.isIndeterminate)
                return <Icons.Indeterminate {...iconAriaAttributes} />;
              if (checkboxProps.checked)
                return <Icons.Checked {...iconAriaAttributes} />;
              return <Icons.Unchecked {...iconAriaAttributes} />;
            })()}
          </div>
          {this.props.children && (
            <Text.Body
              // FIXME: add proper tones when we have disabled/primary in tones
              tone={checkboxProps.disabled ? 'secondary' : undefined}
            >
              {this.props.children}
            </Text.Body>
          )}
        </Spacings.Inline>
      </Label>
    );
  }
}

export default CheckboxInput;
