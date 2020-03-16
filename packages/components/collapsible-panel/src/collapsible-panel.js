import PropTypes from 'prop-types';
import React from 'react';
import isNil from 'lodash/isNil';
import uniqueId from 'lodash/uniqueId';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import CollapsibleMotion from '@commercetools-uikit/collapsible-motion';
import HeaderIcon from './header-icon';
import {
  Container,
  HeaderContainer,
  HeaderControlsWrapper,
  SectionWrapper,
  SectionContent,
} from './collapsible-panel.styles';

const panelContentIdPrefix = 'panel-content-';
const getPanelContentId = id => panelContentIdPrefix + id;

// When `isClosed` is provided the component behaves as a controlled component,
// otherwise it will behave like an uncontrolled component.
const CollapsiblePanel = props => {
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
        <Container theme={props.theme} className={props.className}>
          <HeaderContainer
            as="div"
            id={props.id}
            theme={props.theme}
            label=""
            isOpen={isOpen}
            onClick={props.isDisabled ? undefined : toggle}
            isSticky={props.isSticky}
            isDisabled={props.isDisabled}
            isCondensed={props.condensed}
            buttonAttributes={dataProps}
            headerControlsAlignment={props.headerControlsAlignment}
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
              <HeaderControlsWrapper onClick={event => event.stopPropagation()}>
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
        </Container>
      )}
    </CollapsibleMotion>
  );
};

CollapsiblePanel.getPanelContentId = getPanelContentId;
CollapsiblePanel.displayName = 'CollapsiblePanel';
CollapsiblePanel.propTypes = {
  // common props
  id: PropTypes.string,
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
      return PropTypes.func.isRequired(props, propName, componentName, ...rest);

    if (hasOnToggle)
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${componentName}\`. \`${propName}\` does not have any effect when the component is uncontrolled.`
      );

    // uncontrolled component does not have `onToggle` so no validation needed.
    return null;
  },
};

CollapsiblePanel.defaultProps = {
  id: uniqueId(),
  theme: 'dark',
  condensed: false,
  isDisabled: false,
  headerControlsAlignment: 'right',
};

export default CollapsiblePanel;
