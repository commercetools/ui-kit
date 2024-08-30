import type { ReactElement, ReactNode } from 'react';
import { FormattedMessage, type MessageDescriptor } from 'react-intl';
import { filterAriaAttributes } from '@commercetools-uikit/utils';
import Constraints from '@commercetools-uikit/constraints';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import Text from '@commercetools-uikit/text';
import isNil from 'lodash/isNil';
import {
  getLabelStyles,
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
  barWidth?: 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 'scale';
};

const ProgressBarLabel = (
  props: Pick<
    TProgressBarProps,
    'label' | 'labelWidth' | 'isInverted' | 'height' | 'labelPosition'
  > & { textAlignment: string }
) => {
  if (isNil(props.label)) return null;

  const TextComponent = props.height !== '10' ? Text.Body : Text.Detail;

  const textProps = {
    tone: props.isInverted ? 'inverted' : undefined,
    as: props.height !== '10' ? 'span' : undefined,
    fontWegith: props.height !== '10' ? 'medium' : undefined,
    children: props.label.hasOwnProperty('defaultMessage') ? (
      <FormattedMessage {...(props.label as MessageDescriptor)} />
    ) : (
      props.label
    ),
  } as const;

  return (
    <div css={getLabelStyles(props)}>
      <TextComponent {...textProps}>
        {textProps.children as ReactNode}
      </TextComponent>
    </div>
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

  const LabelWithProps = (
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
  let firstComponent = LabelWithProps;
  let secondComponent = BarWithProps;

  if (props.labelPosition === 'right' || props.labelPosition === 'bottom') {
    firstComponent = BarWithProps;
    secondComponent = LabelWithProps;
  }

  return (
    <WrappingComponent
      scale={props.height === '20' ? 'm' : 's'}
      alignItems="center"
    >
      {firstComponent}
      {secondComponent}
    </WrappingComponent>
  );
};

export const defaultProps: TProgressBarProps = {
  progress: 0,
  label: null,
  labelPosition: 'top',
  labelWidth: 'scale',
  isInverted: false,
  isAnimated: true,
  height: '20',
  barWidth: 6,
};
ProgressBar.displayName = 'ProgressBar';
ProgressBar.defaultProps = defaultProps;

export default ProgressBar;
