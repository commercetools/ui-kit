// @ts-nocheck
import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { isValidElementType } from 'react-is';
import styled from '@emotion/styled';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import {
  filterDataAttributes,
  filterInvalidAttributes,
} from '@commercetools-uikit/utils';
import { accessibleHiddenInputStyles } from '@commercetools-uikit/input-utils';
import { RadioOptionCheckedIcon, RadioOptionUncheckedIcon } from './icons';
import {
  getLabelStyles,
  getContainerStyles,
  LabelTextWrapper,
} from './radio-option.styles';

const Input = styled.input`
  &:focus + div > svg *[data-style='radio-option__border'] {
    stroke: ${vars.borderColorForInputWhenFocused};
  }
`;

const Option = (props) => {
  const labelProps = props.id ? { htmlFor: props.id } : {};
  return (
    <label
      css={getLabelStyles(props)}
      role="radio"
      aria-checked={props.isChecked}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      {...filterInvalidAttributes(labelProps)}
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
        {props.isChecked ? (
          <RadioOptionCheckedIcon size="medium" />
        ) : (
          <RadioOptionUncheckedIcon size="medium" />
        )}
      </div>
      <LabelTextWrapper isDisabled={props.isDisabled}>
        {props.children}
      </LabelTextWrapper>
    </label>
  );
};
Option.displayName = 'RadioOption';
Option.propTypes = {
  // Direct props
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func,
  ]).isRequired,
  components: PropTypes.shape({
    wrapper: (props, propName) => {
      if (props[propName]) {
        if (typeof props[propName] !== 'function') {
          return new Error(
            `Invalid prop 'components.wrapper' supplied to 'RadioInput.Option': the prop is not a function`
          );
        }
        if (props[propName].length !== 1) {
          return new Error(
            `Invalid prop 'components.wrapper' supplied to 'RadioInput.Option': the supplied function should expect one argument`
          );
        }
        if (isValidElementType(props[propName](Fragment))) {
          return new Error(
            `Invalid prop 'components.wrapper' supplied to 'RadioInput.Option': the function supplied should return a valid react element`
          );
        }
      }
      return null;
    },
  }),

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

Option.defaultProps = {
  components: {},
};

export default Option;
