import type {
  ChangeEventHandler,
  MouseEvent,
  KeyboardEvent,
  ReactElement,
} from 'react';
import { useIntl } from 'react-intl';
import FieldLabel from '@commercetools-uikit/field-label';
import Grid from '@commercetools-uikit/grid';
import RadioInput from '@commercetools-uikit/radio-input';
import Spacings from '@commercetools-uikit/spacings';
import AccessibleHidden from '@commercetools-uikit/accessible-hidden';
import { designTokens } from '@commercetools-uikit/design-system';
import SettingsContainer from '../settings-container';
import messages from './messages';
import {
  WRAPPED_TEXT_VISIBLE,
  SHOW_HIDE_ON_DEMAND,
  DENSITY_DEFAULT,
  DENSITY_COMPACT,
} from './constants';

export type TDensityManagerProps = {
  isCondensed?: boolean;
  isWrappingText?: boolean;
  primaryButton?: ReactElement;
  secondaryButton?: ReactElement;
  onDensityDisplayChange: ChangeEventHandler<HTMLInputElement>;
  onTextWrappingChange: ChangeEventHandler<HTMLInputElement>;
  onClose: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => void;
  managerTheme?: 'light' | 'dark';
};

const DensityManager = (props: TDensityManagerProps) => {
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
      containerTheme={props.managerTheme}
    >
      <Grid
        gridGap={designTokens.spacing30}
        gridTemplateColumns="repeat(2, 1fr)"
      >
        <Grid.Item>
          <Spacings.Stack scale={'l'}>
            <FieldLabel
              title={intl.formatMessage(messages.textWrappingSubtitle)}
            />
            <AccessibleHidden>
              <label htmlFor="text-wrapping-0">
                Select radio option: display full text
              </label>
              <label htmlFor="text-wrapping-1">
                Select radio option: display full previews
              </label>
            </AccessibleHidden>
            <RadioInput.Group
              id="text-wrapping"
              name="text-wrapping"
              value={textWrappingOption}
              onChange={props.onTextWrappingChange}
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
          <Spacings.Stack scale={'l'}>
            <FieldLabel
              title={intl.formatMessage(messages.densityDisplaySubtitle)}
            />
            <AccessibleHidden>
              <label htmlFor="density-display-0">
                Select radio option: density default
              </label>
              <label htmlFor="density-display-1">
                Select radio option: density compact
              </label>
            </AccessibleHidden>
            <RadioInput.Group
              id="density-display"
              name="density-display"
              value={densityDisplayOption}
              onChange={props.onDensityDisplayChange}
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

const defaultProps: Pick<
  TDensityManagerProps,
  'isCondensed' | 'isWrappingText'
> = {
  isCondensed: false,
  isWrappingText: false,
};
DensityManager.defaultProps = defaultProps;

export default DensityManager;
