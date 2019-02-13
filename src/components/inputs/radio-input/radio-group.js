import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'tiny-invariant';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import Constraints from '../../constraints';
import Spacings from '../../spacings';
import Option from './radio-option';

const directionWrapper = {
  stack: Spacings.Stack,
  inline: Spacings.Inline,
};

class Group extends React.PureComponent {
  static displayName = 'RadioGroup';
  static propTypes = {
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
  static defaultProps = {
    horizontalConstraint: 'scale',
    direction: 'stack',
    directionProps: {
      scale: 'm',
    },
  };

  componentDidMount() {
    // NOTE: We allow mixed children rendered as (e.g. spacers)
    // as a result we need to filter out children of the correct type.
    const childrenAsArray = React.Children.toArray(this.props.children);
    const optionChildrenAsArray = childrenAsArray.filter(
      child => child.type.displayName === Option.displayName
    );

    invariant(
      optionChildrenAsArray.length > 0,
      'Radio.Group must contain at least one Radio.Option'
    );
  }

  render() {
    const optionElements = React.Children.map(
      this.props.children,
      (child, index) => {
        // NOTE: Allowing to intersperse other elements than `Option`.
        if (child && child.type.displayName === Option.displayName) {
          return React.cloneElement(child, {
            id: `${this.props.id}-${index}`,
            name: this.props.name,
            isChecked: this.props.value === child.props.value,
            isDisabled: child.props.isDisabled || this.props.isDisabled,
            isReadOnly: this.props.isReadOnly,
            hasError: this.props.hasError,
            hasWarning: this.props.hasWarning,
            onChange: this.props.onChange,
            onFocus: this.props.onFocus,
            onBlur: this.props.onBlur,
          });
        }
        return child;
      }
    );
    if (this.props.direction === 'inline') {
      return (
        <div id={this.props.id}>
          <Spacings.Inline
            {...this.props.directionProps}
            {...filterDataAttributes(this.props)}
          >
            {optionElements}
          </Spacings.Inline>
        </div>
      );
    }
    return (
      <div id={this.props.id}>
        <Constraints.Horizontal constraint={this.props.horizontalConstraint}>
          <Spacings.Stack
            {...this.props.directionProps}
            {...filterDataAttributes(this.props)}
          >
            {optionElements}
          </Spacings.Stack>
        </Constraints.Horizontal>
      </div>
    );
  }
}

export default Group;
