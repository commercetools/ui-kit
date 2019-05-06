import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import Icons from './icons';
import accessibleHiddenInputStyles from '../../internals/accessible-hidden-input.styles';
import { getLabelStyles, getContainerStyles } from './radio-option.styles';

const Input = styled.input`
  &:focus + div > svg [id$='borderAndContent'] > [id$='border'] {
    stroke: ${vars.borderColorForInputWhenFocused};
  }
`;

const Option = props => (
  <label
    css={getLabelStyles(props)}
    role="radio"
    aria-checked={props.isChecked}
    onFocus={props.onFocus}
    onBlur={props.onBlur}
    htmlFor={props.id}
  >
    <Input
      css={accessibleHiddenInputStyles}
      id={props.id}
      name={props.name}
      value={props.value}
      onChange={props.isReadOnly ? undefined : props.onChange}
      disabled={props.isDisabled}
      checked={props.isChecked}
      type="radio"
      readOnly={props.isReadOnly}
      aria-readonly={props.isReadOnly}
      {...filterDataAttributes(props)}
    />
    <div css={getContainerStyles(props)}>
      {props.isChecked ? <Icons.Checked /> : <Icons.Default />}
    </div>
    <div
      css={css`
        width: 100%;
        margin-left: ${vars.spacingS};
        font-size: 1rem;
        font-family: ${vars.fontFamilyDefault};
        color: ${props.isDisabled
          ? vars.fontColorForInputWhenDisabled
          : vars.fontColorForInput};
      `}
    >
      {props.children}
    </div>
  </label>
);
Option.displayName = 'RadioOption';
Option.propTypes = {
  // Direct props
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func,
  ]).isRequired,

  // Injected props from the parent Group component
  id: PropTypes.string,
  name: PropTypes.string,
  isChecked: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  hasError: PropTypes.bool,
  hasWarning: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,

  // This prop forces Radio.Option to be rendered in a hovered state (though isDisabled takes
  // precedence over that). We need that to address a use-case when hovering is comming
  // from somewhere up the hierarchy. There is no need to touch this prop in case
  // all you need is a general highlighting on hover of Radio.Option body, which is solved
  // by a corresponding :hover selector in the syles of this component.
  isHovered: PropTypes.bool,
};

export default Option;
