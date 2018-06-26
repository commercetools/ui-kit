import PropTypes from 'prop-types';
import React from 'react';
import isNil from 'lodash.isnil';
import classnames from 'classnames';
import { defaultMemoize } from 'reselect';
import filterDataAttributes from '../../utils/filter-data-attributes';
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
    header: PropTypes.node.isRequired,
    secondaryHeader: PropTypes.node,
    description: PropTypes.string,
    className: PropTypes.string,
    isSticky: PropTypes.bool,
    headerControls: PropTypes.node,
    isDisabled: PropTypes.bool,
    children: PropTypes.node,
    tone: PropTypes.oneOf(['urgent', 'primary']),
    theme: PropTypes.oneOf(['dark', 'light']),
    condensed: PropTypes.bool,

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

  static defaultProps = {
    theme: 'dark',
    condensed: false,
  };

  createHandleToggle = defaultMemoize(toggleFunc => () => {
    if (this.props.isDisabled) return;
    toggleFunc();
  });

  render() {
    // Pass only `data-*` props
    const dataProps = filterDataAttributes(this.props);
    const scale = this.props.condensed ? 's' : 'm';

    return (
      <CollapsibleMotion
        isClosed={this.props.isClosed}
        onToggle={this.props.onToggle}
        isDefaultClosed={this.props.isDefaultClosed}
      >
        {({ isOpen, toggle, containerStyles, registerContentNode }) => (
          <div
            className={classnames(this.props.className, {
              [styles['container-open']]: isOpen,
              [styles['container-theme-light']]: this.props.theme === 'light',
              [styles['container-theme-dark']]: this.props.theme === 'dark',
            })}
          >
            <div
              className={classnames(styles['base-header-container'], {
                [styles['header-container-theme-light']]:
                  this.props.theme === 'light',
                [styles['header-container-theme-dark']]:
                  this.props.theme === 'dark',
                [styles.disabled]: this.props.isDisabled,
                [styles.sticky]: this.props.isSticky && isOpen,
                [styles['header-closed']]: !isOpen,
              })}
            >
              <Spacings.InsetSquish scale={scale}>
                <div
                  {...dataProps}
                  onClick={this.createHandleToggle(toggle)}
                  className={styles.header}
                >
                  <div className={styles['truncate-header']}>
                    <Spacings.Inline alignItems="center" scale={scale}>
                      {!this.props.isDisabled && (
                        <HeaderIcon
                          isClosed={!isOpen}
                          tone={this.props.tone}
                          size={this.props.condensed ? 'small' : 'medium'}
                        />
                      )}
                      {this.props.condensed ? (
                        <Text.Detail
                          isInline={true}
                          isBold={true}
                          truncate={true}
                        >
                          {this.props.header}
                        </Text.Detail>
                      ) : (
                        // NOTE: This should always be used with CollapsiblePanel.Header
                        this.props.header
                      )}
                      {this.props.secondaryHeader && (
                        <Text.Detail tone="secondary" truncate={true}>
                          {this.props.secondaryHeader}
                        </Text.Detail>
                      )}
                    </Spacings.Inline>
                  </div>
                  <div onClick={event => event.stopPropagation()}>
                    {this.props.headerControls}
                  </div>
                </div>
              </Spacings.InsetSquish>
            </div>

            <div style={containerStyles}>
              <div ref={registerContentNode}>
                {this.props.description && (
                  <Spacings.Inset scale={scale}>
                    <Text.Detail>{this.props.description}</Text.Detail>
                  </Spacings.Inset>
                )}
                <Spacings.Inset scale={scale}>
                  <div className={styles.content}>{this.props.children}</div>
                </Spacings.Inset>
              </div>
            </div>
          </div>
        )}
      </CollapsibleMotion>
    );
  }
}
