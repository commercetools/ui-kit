import PropTypes from 'prop-types';
import React from 'react';
import isNil from 'lodash.isnil';
import classnames from 'classnames';
import { filterDataAttributes } from '@commercetools-local/utils/dataset';
import Spacings from '../../materials/spacings';
import Text from '../../typography/text';
import CollapsibleMotion from '../../collapsible-motion';
import HeaderIcon from './header-icon';
import CollapsiblePanelHeader from './collapsible-panel-header';
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

  handleToggle(toggleFunc) {
    if (this.props.isDisabled) return;
    toggleFunc();
  }

  render() {
    // Pass only `data-*` props
    const headerProps = filterDataAttributes(this.props);
    const isStringHeader = typeof this.props.header === 'string';

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
              })}
            >
              <Spacings.InsetSquish scale={this.props.condensed ? 's' : 'm'}>
                <div
                  {...headerProps}
                  onClick={() => this.handleToggle(toggle)}
                  className={styles.header}
                >
                  <div className={styles['truncate-header']}>
                    <Spacings.Inline
                      alignItems="center"
                      scale={this.props.condensed ? 's' : 'm'}
                    >
                      {!this.props.isDisabled && (
                        <HeaderIcon
                          isClosed={!isOpen}
                          tone={this.props.tone}
                          size={this.props.condensed ? 'small' : 'medium'}
                        />
                      )}
                      {this.props.condensed && (
                        <Text.Detail
                          isInline={true}
                          isBold={true}
                          truncate={true}
                        >
                          {this.props.header}
                        </Text.Detail>
                      )}
                      {!this.props.condensed &&
                        isStringHeader && (
                          <CollapsiblePanelHeader>
                            {this.props.header}
                          </CollapsiblePanelHeader>
                        )}
                      {!this.props.condensed &&
                        !isStringHeader &&
                        this.props.header}
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
                  <Spacings.Inset scale={this.props.condensed ? 's' : 'm'}>
                    <Text.Detail>{this.props.description}</Text.Detail>
                  </Spacings.Inset>
                )}
                <Spacings.Inset scale={this.props.condensed ? 's' : 'm'}>
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
