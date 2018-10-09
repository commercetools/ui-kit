import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'tiny-invariant';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import Spacings from '../../spacings';
import Option from './radio-option';

class Group extends React.PureComponent {
  static displayName = 'RadioGroup';
  static propTypes = {
    className: PropTypes.string,
    direction: PropTypes.oneOf(['stack', 'inline']),
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    scale: PropTypes.string,
  };
  static defaultProps = {
    direction: 'stack',
    scale: 'm',
  };

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    // NOTE: We allow mixed children rendered as (e.g. spacers)
    // as a result we need to filter out children of the correct type.
    const childrenAsArray = React.Children.toArray(this.props.children);
    const optionChildrenAsArray = childrenAsArray.filter(
      child => child.type.displayName === Option.displayName
    );

    invariant(
      optionChildrenAsArray.length > 0,
      '@commercetools-frontend/ui-kit/switches/radio: must contain at least one Radio.Option'
    );
  }

  render() {
    const DirectionWrapper =
      this.props.direction === 'stack' ? Spacings.Stack : Spacings.Inline;
    return (
      <div
        className={this.props.className}
        {...filterDataAttributes(this.props)}
      >
        <DirectionWrapper scale={this.props.scale}>
          {React.Children.map(this.props.children, child => {
            // NOTE: Allowing to intersperse other elements than `Option`.
            if (child && child.type.displayName === Option.displayName)
              return React.cloneElement(child, {
                isChecked: this.props.value === child.props.value,
                name: this.props.name,
                onChange: this.props.onChange,
              });
            return child;
          })}
        </DirectionWrapper>
      </div>
    );
  }
}

export default Group;
