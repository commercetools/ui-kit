import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';
import AccessibleButton from '@commercetools-uikit/accessible-button';
import CollapsibleMotion from '@commercetools-uikit/collapsible-motion';
import FieldLabel from '@commercetools-uikit/field-label';
import Grid from '@commercetools-uikit/grid';
import RadioInput from '@commercetools-uikit/radio-input';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import { CloseIcon } from '@commercetools-uikit/icons';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import {
  Container,
  HeaderContainer,
} from '../data-table-settings-panel.styles';
import messages from './messages';
import {
  WRAPPED_TEXT_VISIBLE,
  SHOW_HIDE_ON_DEMAND,
  DENSITY_DEFAULT,
  DENSITY_COMPACT,
} from './constants';

const DensityManager = (props) => {
  const intl = useIntl();
  const textWrappingOption = props.isWrappingText
    ? SHOW_HIDE_ON_DEMAND
    : WRAPPED_TEXT_VISIBLE;
  const densityDisplayOption = props.isCondensed
    ? DENSITY_COMPACT
    : DENSITY_DEFAULT;

  return (
    <CollapsibleMotion isDefaultClosed={false}>
      {({ registerContentNode, containerStyles }) => (
        <Container {...filterDataAttributes(props)}>
          <Spacings.Stack scale="xs">
            <HeaderContainer>
              <Text.Headline as="h3" intlMessage={messages.title} />
              <AccessibleButton
                onClick={props.onClose}
                label={intl.formatMessage(messages.closeButtonLabel)}
              >
                <CloseIcon size="medium" />
              </AccessibleButton>
            </HeaderContainer>
            <Spacings.Stack scale="xs">
              <Spacings.Inset scale="s">
                <div style={containerStyles}>
                  <div ref={registerContentNode}>
                    <Grid
                      gridGap={vars.spacingM}
                      gridTemplateColumns="repeat(2, 1fr)"
                    >
                      <Grid.Item>
                        <Spacings.Stack scale="s">
                          <FieldLabel
                            title={intl.formatMessage(
                              messages.textWrappingSubtitle
                            )}
                          />
                          <RadioInput.Group
                            onChange={props.onTextWrappingChange}
                            name="text-wrapping"
                            value={textWrappingOption}
                          >
                            <RadioInput.Option value={WRAPPED_TEXT_VISIBLE}>
                              {intl.formatMessage(
                                messages.textWrappingAllWrapVisibleOption
                              )}
                            </RadioInput.Option>
                            <RadioInput.Option value={SHOW_HIDE_ON_DEMAND}>
                              {intl.formatMessage(
                                messages.textWrappingShowHideOnDemandOption
                              )}
                            </RadioInput.Option>
                          </RadioInput.Group>
                        </Spacings.Stack>
                      </Grid.Item>
                      <Grid.Item>
                        <Spacings.Stack scale="s">
                          <FieldLabel
                            title={intl.formatMessage(
                              messages.densityDisplaySubtitle
                            )}
                          />
                          <RadioInput.Group
                            onChange={props.onDensityDisplayChange}
                            name="density-display"
                            value={densityDisplayOption}
                          >
                            <RadioInput.Option value={DENSITY_DEFAULT}>
                              {intl.formatMessage(
                                messages.densityDisplayDefaultOption
                              )}
                            </RadioInput.Option>
                            <RadioInput.Option value={DENSITY_COMPACT}>
                              {intl.formatMessage(
                                messages.densityDisplayCompactOption
                              )}
                            </RadioInput.Option>
                          </RadioInput.Group>
                        </Spacings.Stack>
                      </Grid.Item>
                    </Grid>
                  </div>
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

DensityManager.displayName = 'DensityManager';
DensityManager.defaultProps = {
  isCondensed: false,
  isWrappingText: false,
};
DensityManager.propTypes = {
  isCondensed: PropTypes.bool,
  isWrappingText: PropTypes.bool,
  primaryButton: PropTypes.element,
  secondaryButton: PropTypes.element,
  onDensityDisplayChange: PropTypes.func.isRequired,
  onTextWrappingChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DensityManager;
