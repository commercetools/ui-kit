import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'tiny-invariant';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import Constraints from '@commercetools-uikit/constraints';
import Stack from '@commercetools-uikit/spacings-stack';
import Inline from '@commercetools-uikit/spacings-inline';
import Option from './radio-option';

const directionWrapper = {
  stack: Stack,
  inline: Inline,
};

const Group = props => {
  React.useEffect(() => {
    // NOTE: We allow mixed children rendered as (e.g. spacers)
    // as a result we need to filter out children of the correct type.
    const childrenAsArray = React.Children.toArray(props.children);
    const optionChildrenAsArray = childrenAsArray.filter(
      child => child.type.displayName === Option.displayName
    );

    invariant(
      optionChildrenAsArray.length > 0,
      'Radio.Group must contain at least one Radio.Option'
    );
  }, [props.children]);

  const optionElements = React.Children.map(props.children, (child, index) => {
    // NOTE: Allowing to intersperse other elements than `Option`.
    if (child && child.type.displayName === Option.displayName) {
      const clonedChild = React.cloneElement(child, {
        id: props.id && `${props.id}-${index}`,
        name: props.name,
        isChecked: props.value === child.props.value,
        isDisabled: child.props.isDisabled || props.isDisabled,
        isReadOnly: props.isReadOnly,
        hasError: props.hasError,
        hasWarning: props.hasWarning,
        onChange: props.onChange,
        onFocus: props.onFocus,
        onBlur: props.onBlur,
      });
      const { wrapper } = child.props.components;
      return wrapper ? wrapper(clonedChild) : clonedChild;
    }
    return child;
  });
  if (props.direction === 'inline') {
    return (
      <div id={props.id}>
        <Inline {...props.directionProps} {...filterDataAttributes(props)}>
          {optionElements}
        </Inline>
      </div>
    );
  }
  return (
    <div id={props.id}>
      <Constraints.Horizontal constraint={props.horizontalConstraint}>
        <Stack {...props.directionProps} {...filterDataAttributes(props)}>
          {optionElements}
        </Stack>
      </Constraints.Horizontal>
    </div>
  );
};

Group.displayName = 'RadioGroup';
Group.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  hasError: PropTypes.bool,
  hasWarning: PropTypes.bool,
  horizontalConstraint: PropTypes.oneOf(['m', 'l', 'xl', 'scale']),
  direction: PropTypes.oneOf(Object.keys(directionWrapper)),
  directionProps: PropTypes.object,
  children: PropTypes.node.isRequired,
};
Group.defaultProps = {
  horizontalConstraint: 'scale',
  direction: 'stack',
  directionProps: {
    scale: 'm',
  },
};

export default Group;
