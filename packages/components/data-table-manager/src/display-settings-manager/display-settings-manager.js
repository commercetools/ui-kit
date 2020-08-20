import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';
import FieldLabel from '@commercetools-uikit/field-label';
import Grid from '@commercetools-uikit/grid';
import RadioInput from '@commercetools-uikit/radio-input';
import Spacings from '@commercetools-uikit/spacings';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import SettingsContainer from '../settings-container';
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
    <SettingsContainer
      title={messages.title}
      closeButtonLabel={messages.closeButtonLabel}
      onClose={props.onClose}
      primaryButton={props.primaryButton}
      secondaryButton={props.secondaryButton}
    >
      <Grid gridGap={vars.spacingM} gridTemplateColumns="repeat(2, 1fr)">
        <Grid.Item>
          <Spacings.Stack scale="s">
            <FieldLabel
              title={intl.formatMessage(messages.textWrappingSubtitle)}
            />
            <RadioInput.Group
              onChange={props.onTextWrappingChange}
              name="text-wrapping"
              value={textWrappingOption}
            >
              <RadioInput.Option value={WRAPPED_TEXT_VISIBLE}>
                {intl.formatMessage(messages.textWrappingAllWrapVisibleOption)}
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
              title={intl.formatMessage(messages.densityDisplaySubtitle)}
            />
            <RadioInput.Group
              onChange={props.onDensityDisplayChange}
              name="density-display"
              value={densityDisplayOption}
            >
              <RadioInput.Option value={DENSITY_DEFAULT}>
                {intl.formatMessage(messages.densityDisplayDefaultOption)}
              </RadioInput.Option>
              <RadioInput.Option value={DENSITY_COMPACT}>
                {intl.formatMessage(messages.densityDisplayCompactOption)}
              </RadioInput.Option>
            </RadioInput.Group>
          </Spacings.Stack>
        </Grid.Item>
      </Grid>
    </SettingsContainer>
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
