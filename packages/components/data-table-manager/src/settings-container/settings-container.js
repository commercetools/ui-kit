import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import styled from '@emotion/styled';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import AccessibleButton from '@commercetools-uikit/accessible-button';
import CollapsibleMotion from '@commercetools-uikit/collapsible-motion';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import { CloseIcon } from '@commercetools-uikit/icons';
import { filterDataAttributes } from '@commercetools-uikit/utils';

const Container = styled.div`
  background-color: ${vars.colorNeutral95};
  border-radius: ${vars.borderRadius6};
  padding: ${vars.spacingM};
  min-width: ${vars.constraintL};
`;

const HeaderContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
`;

const SettingsContainer = (props) => {
  const intl = useIntl();

  return (
    <CollapsibleMotion isDefaultClosed={false}>
      {({ registerContentNode, containerStyles }) => (
        <Container {...filterDataAttributes(props)}>
          <Spacings.Stack scale="xs">
            <HeaderContainer>
              <Text.Headline as="h3" intlMessage={props.title} />
              <AccessibleButton
                onClick={props.onClose}
                label={intl.formatMessage(props.closeButtonLabel)}
              >
                <CloseIcon size="medium" />
              </AccessibleButton>
            </HeaderContainer>
            <Spacings.Stack scale="xs">
              <Spacings.Inset scale="s">
                <div style={containerStyles}>
                  <div ref={registerContentNode}>{props.children}</div>
                </div>
              </Spacings.Inset>
              {(props.secondaryButton || props.primaryButton) && (
                <Spacings.Inline justifyContent="flex-end">
                  {props.secondaryButton}
                  {props.primaryButton}
                </Spacings.Inline>
              )}
            </Spacings.Stack>
          </Spacings.Stack>
        </Container>
      )}
    </CollapsibleMotion>
  );
};

SettingsContainer.displayName = 'SettingsContainer';
SettingsContainer.propTypes = {
  title: PropTypes.shape({
    id: PropTypes.string.isRequired,
    defaultMessage: PropTypes.string.isRequired,
  }).isRequired,
  closeButtonLabel: PropTypes.shape({
    id: PropTypes.string.isRequired,
    defaultMessage: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  primaryButton: PropTypes.element,
  secondaryButton: PropTypes.element,
  children: PropTypes.node.isRequired,
};

export default SettingsContainer;
