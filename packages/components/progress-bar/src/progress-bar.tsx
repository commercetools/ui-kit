import type { ReactElement, ReactNode } from 'react';
import { FormattedMessage, type MessageDescriptor } from 'react-intl';
import { css } from '@emotion/react';
import { filterAriaAttributes } from '@commercetools-uikit/utils';
import Constraints from '@commercetools-uikit/constraints';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import Text from '@commercetools-uikit/text';
import isNil from 'lodash/isNil';
import {
  heightPerScale,
  getBackgroundBarStyles,
  getForegroundBarStyles,
} from './progress-bar.styles';

export type TProgressBarProps = {
  /**
   * The percentage of the task completion to fill the bar.
   */
  progress?: number;
  /**
   * The text to display alongside the bar.
   */
  label?:
    | string
    | ReactElement
    | (MessageDescriptor & { values?: Record<string, ReactNode> })
    | null;
  /**
   * Location of the text in relation to the bar.
   */
  labelPosition?: 'top' | 'bottom' | 'left' | 'right';
  /**
   * The scale of the width for the label, uses values available in the Constraints.Horizontal component.
   */
  labelWidth?:
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 'scale'
    | 'auto';
  /**
   * Specifies the use of light colors(default) or dark colors.
   */
  isInverted?: boolean;
  /**
   * Specifies whether the inner bar should have the styles animated.
   */
  isAnimated?: boolean;
  /**
   * The scale of the height for the bar, also affects the styles of the label.
   */
  height?: '10' | '20';
  /**
   * The scale of the width for the label, uses values available in the Constraints.Horizontal component.
   */
  barWidth?:
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 'scale'
    | 'auto';
};

const ProgressBarLabel = (
  props: Pick<
    TProgressBarProps,
    'label' | 'labelWidth' | 'isInverted' | 'height' | 'labelPosition'
  > & { textAlignment: string }
) => {
  if (isNil(props.label)) return null;

  const label = props.label.hasOwnProperty('defaultMessage') ? (
    <FormattedMessage {...(props.label as MessageDescriptor)} />
  ) : (
    props.label
  );

  return (
    <Constraints.Horizontal max={props.labelWidth}>
      <div
        css={css`
          min-height: ${heightPerScale[props.height ?? '20']};
          text-align: ${props.textAlignment};
        `}
      >
        {props.height === '10' ? (
          <Text.Detail tone={props.isInverted ? 'inverted' : undefined}>
            {label}
          </Text.Detail>
        ) : (
          <Text.Body
            as="span"
            tone={props.isInverted ? 'inverted' : undefined}
            fontWeight="medium"
          >
            {label}
          </Text.Body>
        )}
      </div>
    </Constraints.Horizontal>
  );
};

const Bar = (
  props: Pick<
    TProgressBarProps,
    'progress' | 'height' | 'barWidth' | 'isInverted' | 'isAnimated'
  >
) => {
  return (
    <Constraints.Horizontal max={props.barWidth}>
      <div
        css={getBackgroundBarStyles(props)}
        role="progressbar"
        aria-valuenow={props.progress}
        aria-label="Progress bar"
        {...filterAriaAttributes(props)}
      >
        <div css={getForegroundBarStyles(props)} />
      </div>
    </Constraints.Horizontal>
  );
};

const layoutConfigMapping = {
  top: {
    textAlignment: 'center',
    wrappingComponent: SpacingsStack,
  },
  bottom: {
    textAlignment: 'center',
    wrappingComponent: SpacingsStack,
  },
  left: {
    textAlignment: 'right',
    wrappingComponent: SpacingsInline,
  },
  right: {
    textAlignment: 'left',
    wrappingComponent: SpacingsInline,
  },
} as const;

const ProgressBar = (props: TProgressBarProps) => {
  const layoutConfig = layoutConfigMapping[props.labelPosition || 'top'];

  const BarWithProps = (
    <Bar
      progress={props.progress}
      barWidth={props.barWidth}
      isInverted={props.isInverted}
      height={props.height}
      isAnimated={props.isAnimated}
    />
  );

  const LabelWithWithProps = (
    <ProgressBarLabel
      label={props.label}
      labelWidth={props.labelWidth}
      labelPosition={props.labelPosition}
      isInverted={props.isInverted}
      height={props.height}
      textAlignment={layoutConfig.textAlignment}
    />
  );

  const WrappingComponent = layoutConfig.wrappingComponent;
  let firstComponent = LabelWithWithProps;
  let secondComponent = BarWithProps;

  if (props.labelPosition === 'right' || props.labelPosition === 'bottom') {
    firstComponent = BarWithProps;
    secondComponent = LabelWithWithProps;
  }

  return (
    <WrappingComponent scale="m" alignItems="center">
      {firstComponent}
      {secondComponent}
    </WrappingComponent>
  );
};

const defaultProps: TProgressBarProps = {
  progress: 0,
  label: null,
  labelPosition: 'top',
  labelWidth: 6,
  isInverted: false,
  isAnimated: true,
  height: '20',
  barWidth: 6,
};
ProgressBar.displayName = 'ProgressBar';
ProgressBar.defaultProps = defaultProps;

export default ProgressBar;
