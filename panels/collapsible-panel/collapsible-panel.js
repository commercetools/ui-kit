import PropTypes from 'prop-types';
import React from 'react';
import isNil from 'lodash.isnil';
import classnames from 'classnames';
import { filterDataAttributes } from '@commercetools-local/utils/dataset';
import Spacings from '../../materials/spacings';
import Text from '../../typography/text';
import CollapsibleMotion from '../../collapsible-motion';
import HeaderIcon from './header-icon';
import styles from './collapsible-panel.mod.css';

// When `isClosed` is provided the component behaves as a controlled component,
// otherwise it will behave like an uncontrolled component.

export default class CollapsiblePanel extends React.PureComponent {
  static displayName = 'CollapsiblePanel';
  static propTypes = {
    // common props
    label: PropTypes.node.isRequired,
    description: PropTypes.string,
    className: PropTypes.string,
    isSticky: PropTypes.bool,
    headerControls: PropTypes.node,
    isDisabled: PropTypes.bool,
    children: PropTypes.node,
    tone: PropTypes.oneOf(['urgent', 'primary']),

    // props when uncontrolled
    isDefaultClosed(props, propName, componentName, ...rest) {
      if (!isNil(props.isClosed) && !isNil(props.isDefaultClosed)) {
        return new Error(
          `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Component must either be controlled or uncontrolled. Pass either \`isClosed\` or \`isDefaultClosed\` but not both.`
        );
      }

      return PropTypes.bool(props, propName, componentName, ...rest);
    },

    // props when controlled
    isClosed: PropTypes.bool,
    onToggle(props, propName, componentName, ...rest) {
      const isControlledComponent = !isNil(props.isClosed);
      const hasOnToggle = !isNil(props.onToggle);

      // controlled
      if (isControlledComponent)
        return PropTypes.func.isRequired(
          props,
          propName,
          componentName,
          ...rest
        );

      if (hasOnToggle)
        return new Error(
          `Invalid prop \`${propName}\` supplied to \`${componentName}\`. \`${propName}\` does not have any effect when the component is uncontrolled.`
        );

      // uncontrolled component does not have `onToggle` so no validation needed.
      return null;
    },
  };

  handleToggle(toggleFunc) {
    if (this.props.isDisabled) return;
    toggleFunc();
  }

  render() {
    // Pass only `data-*` props
    const headerProps = filterDataAttributes(this.props);

    return (
      <CollapsibleMotion
        isClosed={this.props.isClosed}
        onToggle={this.props.onToggle}
        isDefaultClosed={this.props.isDefaultClosed}
      >
        {({ isOpen, toggle, containerStyles, registerContentNode }) => (
          <div
            className={classnames(this.props.className, styles.container, {
              [styles['container-open']]: isOpen,
            })}
          >
            <div
              className={classnames(styles['header-container'], {
                [styles.sticky]: this.props.isSticky && isOpen,
              })}
            >
              <Spacings.InsetSquish>
                <div
                  {...headerProps}
                  onClick={() => this.handleToggle(toggle)}
                  className={styles.header}
                >
                  {!this.props.isDisabled && (
                    <HeaderIcon isClosed={!isOpen} tone={this.props.tone} />
                  )}
                  <Text.Headline elementType="h2">
                    {this.props.label}
                  </Text.Headline>
                  {this.props.headerControls}
                </div>
              </Spacings.InsetSquish>
            </div>

            <div style={containerStyles}>
              <div ref={registerContentNode}>
                {this.props.description && (
                  <Spacings.Inset scale="m">
                    <Text.Detail>{this.props.description}</Text.Detail>
                  </Spacings.Inset>
                )}
                <Spacings.Inset scale="m">{this.props.children}</Spacings.Inset>
              </div>
            </div>
          </div>
        )}
      </CollapsibleMotion>
    );
  }
}
