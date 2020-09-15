import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import styled from '@emotion/styled';
import AccessibleButton from '@commercetools-uikit/accessible-button';
import CollapsibleMotion from '@commercetools-uikit/collapsible-motion';
import Card from '@commercetools-uikit/card';
import Constraints from '@commercetools-uikit/constraints';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import { CloseIcon } from '@commercetools-uikit/icons';

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
        <Card type="flat" theme={props.containerTheme}>
          <Constraints.Horizontal constraint="xl">
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
          </Constraints.Horizontal>
        </Card>
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
  containerTheme: PropTypes.oneOf(['light', 'dark']).isRequired,
};
SettingsContainer.defaultProps = {
  containerTheme: 'dark',
};

export default SettingsContainer;
