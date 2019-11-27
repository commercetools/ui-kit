import PropTypes from 'prop-types';
import React from 'react';
import isNil from 'lodash/isNil';
import { css } from '@emotion/core';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import CollapsibleMotion from '@commercetools-uikit/collapsible-motion';
import HeaderIcon from './header-icon';
import {
  getContainerStyles,
  getContentStyles,
  getHeaderContainerStyles,
  getHeaderStyles,
} from './collapsible-panel.styles';

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
    isDisabled: PropTypes.bool,
    children: PropTypes.node,
    tone: PropTypes.oneOf(['urgent', 'primary']),
    theme: PropTypes.oneOf(['dark', 'light']),
    condensed: PropTypes.bool,
    hideExpansionControls: PropTypes.bool,
    headerControls: PropTypes.node,
    headerControlsAlignment: PropTypes.oneOf(['left', 'right']),

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
    isDisabled: false,
    headerControlsAlignment: 'right',
  };

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
            css={getContainerStyles({
              isCondensed: this.props.condensed,
              theme: this.props.theme,
            })}
            className={this.props.className}
          >
            <div
              css={getHeaderContainerStyles({
                isOpen,
                isDisabled: this.props.isDisabled,
                isSticky: this.props.isSticky,
                theme: this.props.theme,
              })}
              onClick={this.props.isDisabled ? undefined : toggle}
            >
              <Spacings.InsetSquish scale={scale}>
                <div
                  {...dataProps}
                  css={getHeaderStyles({
                    isCondensed: this.props.condensed,
                    isDisabled: this.props.isDisabled,
                    headerControlsAlignment: this.props.headerControlsAlignment,
                  })}
                >
                  <div
                    css={css`
                      min-width: 0;
                    `}
                  >
                    <Spacings.Inline alignItems="center" scale="s">
                      {!this.props.hideExpansionControls && (
                        <HeaderIcon
                          isClosed={!isOpen}
                          isDisabled={this.props.isDisabled}
                          tone={this.props.tone}
                          size={this.props.condensed ? 'small' : 'medium'}
                        />
                      )}
                      <Spacings.Inline alignItems="center" scale={scale}>
                        {this.props.condensed ? (
                          <Text.Detail
                            isInline={true}
                            isBold={true}
                            truncate={true}
                          >
                            {this.props.header}
                          </Text.Detail>
                        ) : (
                          this.props.header
                        )}
                        {this.props.secondaryHeader && (
                          <Text.Detail tone="secondary" truncate={true}>
                            {this.props.secondaryHeader}
                          </Text.Detail>
                        )}
                      </Spacings.Inline>
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
                  <div css={getContentStyles()}>{this.props.children}</div>
                </Spacings.Inset>
              </div>
            </div>
          </div>
        )}
      </CollapsibleMotion>
    );
  }
}
