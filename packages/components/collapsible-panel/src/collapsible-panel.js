import React from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import uniqueId from 'lodash/uniqueId';
import styled from '@emotion/styled';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import AccessibleButton from '@commercetools-uikit/accessible-button';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import CollapsibleMotion from '@commercetools-uikit/collapsible-motion';
import Constraints from '@commercetools-uikit/constraints';
import HeaderIcon from './header-icon';
import {
  baseContainerStyles,
  getHeaderContainerStyles,
  getThemeStyle,
  HeaderControlsWrapper,
  SectionWrapper,
  SectionContent,
} from './collapsible-panel.styles';

const HeaderContainer = styled(AccessibleButton)``;

const panelContentIdPrefix = 'panel-content-';
const getPanelContentId = (id) => panelContentIdPrefix + id;

// When `isClosed` is provided the component behaves as a controlled component,
// otherwise it will behave like an uncontrolled component.
const CollapsiblePanel = (props) => {
  const panelContentId = getPanelContentId(props.id);
  // Pass only `data-*` props
  const dataProps = filterDataAttributes(props);
  const scale = props.condensed ? 's' : 'm';

  return (
    <CollapsibleMotion
      isClosed={props.isClosed}
      onToggle={props.onToggle}
      isDefaultClosed={props.isDefaultClosed}
    >
      {({ isOpen, toggle, containerStyles, registerContentNode }) => (
        <Constraints.Horizontal max={props.horizontalConstraint}>
          <div
            css={[baseContainerStyles, getThemeStyle(props.theme)]}
            // Allow to override the styles by passing a `className` prop.
            // Custom styles can also be passed using the `css` prop from emotion.
            // https://emotion.sh/docs/css-prop#style-precedence
            className={props.className}
          >
            <HeaderContainer
              as="div"
              css={[
                getHeaderContainerStyles(props, isOpen),
                getThemeStyle(props.theme),
              ]}
              id={props.id}
              label=""
              onClick={props.isDisabled ? undefined : toggle}
              isDisabled={props.isDisabled}
              buttonAttributes={dataProps}
              aria-controls={panelContentId}
              aria-expanded={isOpen ? 'true' : 'false'}
            >
              <Spacings.Inline alignItems="center" scale="s">
                {!props.hideExpansionControls && (
                  <HeaderIcon
                    isClosed={!isOpen}
                    isDisabled={props.isDisabled}
                    tone={props.tone}
                    size={props.condensed ? 'small' : 'medium'}
                  />
                )}
                <Spacings.Inline alignItems="center" scale={scale}>
                  {props.condensed ? (
                    <Text.Detail isInline={true} isBold={true} truncate={true}>
                      {props.header}
                    </Text.Detail>
                  ) : (
                    props.header
                  )}
                  {props.secondaryHeader && (
                    <Text.Detail tone="secondary" truncate={true}>
                      {props.secondaryHeader}
                    </Text.Detail>
                  )}
                </Spacings.Inline>
              </Spacings.Inline>
              {props.headerControls && (
                <HeaderControlsWrapper
                  onClick={(event) => event.stopPropagation()}
                >
                  {props.headerControls}
                </HeaderControlsWrapper>
              )}
            </HeaderContainer>
            <div style={containerStyles}>
              <SectionWrapper isOpen={isOpen} ref={registerContentNode}>
                {props.description && (
                  <Spacings.Inset scale={scale}>
                    <Text.Detail>{props.description}</Text.Detail>
                  </Spacings.Inset>
                )}
                <Spacings.Inset scale={scale}>
                  <SectionContent
                    id={panelContentId}
                    aria-hidden={isOpen ? 'false' : 'true'}
                  >
                    {props.children}
                  </SectionContent>
                </Spacings.Inset>
              </SectionWrapper>
            </div>
          </div>
        </Constraints.Horizontal>
      )}
    </CollapsibleMotion>
  );
};

CollapsiblePanel.getPanelContentId = getPanelContentId;
CollapsiblePanel.displayName = 'CollapsiblePanel';
CollapsiblePanel.propTypes = {
  /**
   * An unique id for the panel header, which will also be used to generate a prefixed id for the panel content section.
   * <br/>
   * Read about `getPanelContentId` below for more about this.
   */
  id: PropTypes.string,
  /**
   * The title being rendered at top left of the panel
   */
  header: PropTypes.node.isRequired,
  /**
   * A secondary header for the panel (only pass if needed)
   */
  secondaryHeader: PropTypes.node,
  /**
   * If passed will be shown below the title as more information regarding the panel
   */
  description: PropTypes.string,
  className: PropTypes.string,
  /**
   * Makes the panel's header sticky in regards to the page's scroll
   */
  isSticky: PropTypes.bool,
  /**
   * Controls at the top right part of the panel
   */
  headerControls: PropTypes.node,
  /**
   * Disables the panel and all interactions with it
   */
  isDisabled: PropTypes.bool,
  /**
   * The actual content rendered inside the panel
   */
  children: PropTypes.node,
  tone: PropTypes.oneOf(['urgent', 'primary']),
  /**
   * The main color combination of the for the panel header and container
   */
  theme: PropTypes.oneOf(['dark', 'light']),
  /**
   * Whenever `true` the headers and content itself
   * will consume less space in that to the borders are smaller and everything has less padding
   */
  condensed: PropTypes.bool,
  /**
   * Controls the visibility of the expansion controls on the left
   */
  hideExpansionControls: PropTypes.bool,
  headerControlsAlignment: PropTypes.oneOf(['left', 'right']),

  /**
   * Indicates if the panel's content should be collapsed or shown by default.
   * <br />
   * Updates to this value are not respected. Only used for **uncontrolled** mode (when no`onToggle` is passed.)
   */
  isDefaultClosed(props, propName, componentName, ...rest) {
    if (!isNil(props.isClosed) && !isNil(props.isDefaultClosed)) {
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Component must either be controlled or uncontrolled. Pass either \`isClosed\` or \`isDefaultClosed\` but not both.`
      );
    }

    return PropTypes.bool(props, propName, componentName, ...rest);
  },

  /**
   * Indicates if the panel's content should be collapsed or shown.
   * <br />
   * Component becomes **controlled* when this is passed.
   */
  isClosed: PropTypes.bool,
  /**
   * function to be triggered whenever the user clicks the top area to collapse the panel's content
   * <br />
   * Becomes required when `isClosed` is passed.
   * <br />
   * Signature: `() => void`
   */
  onToggle(props, propName, componentName, ...rest) {
    const isControlledComponent = !isNil(props.isClosed);
    const hasOnToggle = !isNil(props.onToggle);

    // controlled
    if (isControlledComponent)
      return PropTypes.func.isRequired(props, propName, componentName, ...rest);

    if (hasOnToggle)
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${componentName}\`. \`${propName}\` does not have any effect when the component is uncontrolled.`
      );
    // uncontrolled component does not have `onToggle` so no validation needed.
    return null;
  },
  /**
   * Horizontal size limit of the input fields.
   */
  horizontalConstraint: PropTypes.oneOf([
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    'scale',
    'auto',
  ]),
};

CollapsiblePanel.defaultProps = {
  id: uniqueId(),
  theme: 'dark',
  condensed: false,
  isDisabled: false,
  headerControlsAlignment: 'right',
  horizontalConstraint: 'scale',
};

export { CollapsiblePanel };
