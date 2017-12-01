import PropTypes from 'prop-types';
import React from 'react';
import isNil from 'lodash.isnil';
import classnames from 'classnames';
import { filterDataAttributes } from '@commercetools-local/utils/dataset';
import Spacings from '../../materials/spacings';
import Text from '../../typography/text';
import Collapsible from '../../collapsible';
import HeaderIcon from './header-icon';
import styles from './collapsible-panel.mod.css';

export class ControlledCollapsiblePanel extends React.PureComponent {
  static displayName = 'ControlledCollapsiblePanel';

  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.node.isRequired,
    description: PropTypes.string,
    isClosed: PropTypes.bool.isRequired,
    isSticky: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool,
    children: PropTypes.node,
    headerControls: PropTypes.node,
    tone: PropTypes.oneOf(['urgent', 'primary']),
  };

  static defaultProps = {
    isClosed: false,
    isSticky: false,
    isDisabled: false,
    tone: 'primary',
  };

  handleToggle = () => {
    if (this.props.isDisabled) return;

    this.props.onToggle();
  };

  render() {
    // Pass only `data-*` props
    const headerProps = filterDataAttributes(this.props);
    return (
      <div
        className={classnames(this.props.className, styles.container, {
          [styles['container-open']]: !this.props.isClosed,
        })}
      >
        <div
          className={classnames(styles['header-container'], {
            [styles.sticky]: this.props.isSticky && !this.props.isClosed,
          })}
        >
          <Spacings.InsetSquish>
            <div
              {...headerProps}
              onClick={this.handleToggle}
              className={styles.header}
            >
              {!this.props.isDisabled && (
                <HeaderIcon
                  isClosed={this.props.isClosed}
                  tone={this.props.tone}
                />
              )}
              <Text.Headline
                elementType="h2"
                data-track-component="CollapsiblePanel"
                data-track-event="click"
                data-track-label={this.props.isClosed ? 'open' : 'close'}
              >
                {this.props.label}
              </Text.Headline>
              {this.props.headerControls}
            </div>
          </Spacings.InsetSquish>
        </div>

        {this.props.description &&
          !this.props.isClosed && (
            <Spacings.Inset scale="m">
              <Text.Detail>{this.props.description}</Text.Detail>
            </Spacings.Inset>
          )}

        <div
          className={classnames(styles.content, {
            [styles['content-hidden']]: this.props.isClosed,
          })}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

export const UncontrolledCollapsiblePanel = ({
  isDefaultClosed,
  children,
  ...remainingProps
}) => (
  <Collapsible isDefaultClosed={isDefaultClosed}>
    {({ isOpen, toggle }) => (
      <ControlledCollapsiblePanel
        isClosed={!isOpen}
        onToggle={toggle}
        // We spread remaining props to get potential PropType
        // warnings from `ControlledCollapsiblePanel`.
        {...remainingProps}
      >
        {children}
      </ControlledCollapsiblePanel>
    )}
  </Collapsible>
);
UncontrolledCollapsiblePanel.displayName = 'UncontrolledCollapsiblePanel';
UncontrolledCollapsiblePanel.propTypes = {
  isDefaultClosed: PropTypes.bool,
  children: PropTypes.node,
};

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
          `Invalid prop \`${propName}\` supplied to \`${
            componentName
          }\`. Component must either be controlled or uncontrolled. Pass either \`isClosed\` or \`isDefaultClosed\` but not both.`
        );
      }

      return PropTypes.bool(props, propName, componentName, ...rest);
    },

    // props when controlled
    isClosed: PropTypes.bool,
    onToggle(props, propName, componentName, ...rest) {
      // The component can be controlled or uncontrolled.
      // when uncontrolled (no isClosed passed)
      //  -> There may not be `onToggle`
      // when controlled (isClosed passed)
      //  -> `onToggle` is required

      const isControlledComponent = !isNil(props.isClosed);

      // uncontrolled
      if (!isControlledComponent) {
        const hasOnToggle = !isNil(props.onToggle);
        if (hasOnToggle)
          return new Error(
            `Invalid prop \`${propName}\` supplied to \`${componentName}\`. \`${
              propName
            }\` does not have any effect when the component is uncontrolled.`
          );

        // uncontrolled component does not have `onToggle` so no validation
        // needed.
        return null;
      }

      return PropTypes.func.isRequired(props, propName, componentName, ...rest);
    },
  };
  static defaultProps = {
    tone: 'primary',
  };
  render() {
    return {}.hasOwnProperty.call(this.props, 'isClosed') ? (
      <ControlledCollapsiblePanel
        label={this.props.label}
        description={this.props.description}
        className={this.props.className}
        isSticky={this.props.isSticky}
        headerControls={this.props.headerControls}
        isClosed={this.props.isClosed}
        onToggle={this.props.onToggle}
        isDisabled={this.props.isDisabled}
        tone={this.props.tone}
      >
        {this.props.children}
      </ControlledCollapsiblePanel>
    ) : (
      <UncontrolledCollapsiblePanel
        label={this.props.label}
        description={this.props.description}
        className={this.props.className}
        isSticky={this.props.isSticky}
        headerControls={this.props.headerControls}
        isDefaultClosed={this.props.isDefaultClosed}
        isDisabled={this.props.isDisabled}
        tone={this.props.tone}
      >
        {this.props.children}
      </UncontrolledCollapsiblePanel>
    );
  }
}
