import PropTypes from 'prop-types';
import React from 'react';
import isNil from 'lodash.isnil';
import { css } from '@emotion/core';
import classnames from 'classnames';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import Spacings from '../../spacings';
import Text from '../../typography/text';
import CollapsibleMotion from '../../collapsible-motion';
import HeaderIcon from './header-icon';
import styles from './collapsible-panel.mod.css';
import vars from '../../../../materials/custom-properties';

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
    hideExpansionControls: PropTypes.bool,

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
            css={[
              css`
                font-family: ${vars.fontFamilyDefault};
                box-shadow: ${vars.shadow1Second};
                color: ${vars.colorBlack};
                border-radius: ${vars.borderRadius6};
                position: relative;
                min-width: 550px;
                font-size: ${vars.fontSizeDefault};
                padding: 0;
                background-color: ${this.props.theme === 'light'
                  ? vars.colorWhite
                  : vars.colorGray95};
              `,
              this.props.condensed &&
                css`
                  min-width: 0;
                `,
            ]}
            className={this.props.className}
          >
            <div
              css={[
                css`
                  position: relative;
                  cursor: pointer;
                  border-top-left-radius: ${vars.borderRadius6};
                  border-top-right-radius: ${vars.borderRadius6};
                  background-color: ${this.props.theme === 'light'
                    ? vars.colorWhite
                    : vars.colorGray95};
                `,
                isOpen &&
                  css`
                    border-bottom: 1px ${vars.colorGray60} solid;
                  `,
                this.props.isDisabled &&
                  css`
                    cursor: default;
                  `,
                this.props.isSticky &&
                  isOpen &&
                  css`
                    position: sticky;
                    top: 0;
                    z-index: 1;
                    border-top-right-radius: ${vars.borderRadius6};
                    border-top-left-radius: ${vars.borderRadius6};

                    /* FIXME: this is supposed to fix a bug in Chrome with position: sticky in
                           low-DPI screens. Once the bug is fixed, please remove this. (https://goo.gl/GVcJXf) */

                    @media only screen and (-webkit-max-device-pixel-ratio: 1) {
                      top: calc(${vars.spacing16} * -1);
                    }
                  `,
                !isOpen &&
                  css`
                    border-bottom-left-radius: ${vars.borderRadius6};
                    border-bottom-right-radius: ${vars.borderRadius6};
                  `,
              ]}
              onClick={this.props.isDisabled ? undefined : toggle}
              className={classnames({
                [styles['header-closed']]: !isOpen,
              })}
            >
              <Spacings.InsetSquish scale={scale}>
                <div
                  {...dataProps}
                  css={[
                    css`
                      display: flex;
                      flex: 1;
                      align-items: center;
                      list-style-type: none;
                      justify-content: space-between;

                      /*
                    Two resource that explain why we need the min-width: 0; here
                    By default, min-width is set to 'auto'. That means that this flex-child is not
                    allowed to grow any smaller than the longest text inside. So it will stretch
                    no matter how you set the flex-grow property
                    To fix this you need to set min-width to 0. This tells the flex-child that
                    it is ok to be narrower than the longest word inside
                    https://hackernoon.com/11-things-i-learned-reading-the-flexbox-spec-5f0c799c776b
                    https://css-tricks.com/flexbox-truncated-text/
                    */

                      min-width: 0;

                      > * + * {
                        /* would have loved to use Spacings.Inline here but that would require a
                      complete overhaul of this components' structure */
                        margin: 0 0 0 ${vars.spacing16};
                      }
                    `,
                    this.props.isDisabled &&
                      css`
                        cursor: default;
                      `,
                  ]}
                >
                  <div className={styles['truncate-header']}>
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
                  <div
                    css={css`
                      width: 100%;
                      display: flex;
                      flex-wrap: wrap;
                      align-items: flex-start;
                    `}
                  >
                    {this.props.children}
                  </div>
                </Spacings.Inset>
              </div>
            </div>
          </div>
        )}
      </CollapsibleMotion>
    );
  }
}
