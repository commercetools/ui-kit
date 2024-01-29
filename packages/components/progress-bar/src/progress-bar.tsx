import { type ReactElement, type ReactNode } from 'react';
import { FormattedMessage, type MessageDescriptor } from 'react-intl';
import { css, keyframes } from '@emotion/react';
import { filterAriaAttributes } from '@commercetools-uikit/utils';
import { designTokens } from '@commercetools-uikit/design-system';
import Constraints from '@commercetools-uikit/constraints';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import Text from '@commercetools-uikit/text';
import isNil from 'lodash/isNil';

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

const heightPerScale = {
  '10': designTokens.spacing25,
  '20': designTokens.spacing40,
};

// This function is not called with null or undefined
const getLabel = (label: NonNullable<TProgressBarProps['label']>) => {
  if (typeof label === 'string') return label;
  return label.hasOwnProperty('defaultMessage') ? (
    <FormattedMessage {...label} />
  ) : (
    label
  );
};

const ProgressBarLabel = (
  props: Pick<
    TProgressBarProps,
    'label' | 'labelWidth' | 'isInverted' | 'height' | 'labelPosition'
  >
) => {
  if (isNil(props.label)) return null;
  return (
    <Constraints.Horizontal max={props.labelWidth}>
      <div
        css={css`
          min-height: ${heightPerScale[props.height ?? '20']};
          ${(props.labelPosition === 'top' ||
            props.labelPosition === 'bottom') &&
          css`
            text-align: center;
          `}
        `}
      >
        {props.height === '10' ? (
          <Text.Detail tone={props.isInverted ? 'inverted' : undefined}>
            {getLabel(props.label)}
          </Text.Detail>
        ) : (
          <Text.Body
            as="span"
            tone={props.isInverted ? 'inverted' : undefined}
            fontWeight="medium"
          >
            {getLabel(props.label)}
          </Text.Body>
        )}
      </div>
    </Constraints.Horizontal>
  );
};

const progressPulse = keyframes`
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
`;

const Bar = (
  props: Pick<
    TProgressBarProps,
    'progress' | 'height' | 'barWidth' | 'isInverted' | 'isAnimated'
  >
) => {
  return (
    <Constraints.Horizontal max={props.barWidth}>
      <div
        css={css`
          background-color: ${props.isInverted
            ? 'rgba(255, 255, 255, 0.4)'
            : designTokens.colorNeutral90};
          border-radius: ${designTokens.spacingL};
          height: ${heightPerScale[props.height ?? '20']};
          overflow: hidden;
        `}
        role="progressbar"
        aria-valuenow={props.progress}
        aria-label="Progress bar"
        {...filterAriaAttributes(props)}
      >
        <div
          css={css`
            width: ${props.progress}%;
            transition: width 500ms ease-in-out;
            display: block;
            height: ${heightPerScale[props.height ?? '20']};
            background: ${props.isInverted
              ? designTokens.colorSurface
              : `linear-gradient(
                to right,
                #00E5CB,
                ${designTokens.colorPrimary25},
                #00E5CB
              )`};
            background-size: 200% 100%;
            animation: ${props.isAnimated && !props.isInverted
              ? css`
                  ${progressPulse} 2s linear infinite
                `
              : 'none'};
            border-radius: ${designTokens.spacingL};
          `}
        />
      </div>
    </Constraints.Horizontal>
  );
};

const ProgressBar = (props: TProgressBarProps) => {
  switch (props.labelPosition) {
    case 'bottom':
      return (
        <SpacingsStack scale="m" alignItems="center">
          <Bar
            progress={props.progress}
            barWidth={props.barWidth}
            isInverted={props.isInverted}
            height={props.height}
            isAnimated={props.isAnimated}
          />
          <ProgressBarLabel
            label={props.label}
            labelWidth={props.labelWidth}
            labelPosition={props.labelPosition}
            isInverted={props.isInverted}
            height={props.height}
          />
        </SpacingsStack>
      );
    case 'left':
      return (
        <SpacingsInline scale="m" alignItems="center">
          <div
            css={css`
              text-align: right;
            `}
          >
            <SpacingsInline justifyContent="center">
              <ProgressBarLabel
                label={props.label}
                labelWidth={props.labelWidth}
                labelPosition={props.labelPosition}
                isInverted={props.isInverted}
                height={props.height}
              />
            </SpacingsInline>
          </div>
          <Bar
            progress={props.progress}
            barWidth={props.barWidth}
            isInverted={props.isInverted}
            height={props.height}
            isAnimated={props.isAnimated}
          />
        </SpacingsInline>
      );
    case 'right':
      return (
        <SpacingsInline scale="m" alignItems="center">
          <Bar
            progress={props.progress}
            barWidth={props.barWidth}
            isInverted={props.isInverted}
            height={props.height}
            isAnimated={props.isAnimated}
          />
          <SpacingsInline justifyContent="center">
            <ProgressBarLabel
              label={props.label}
              labelWidth={props.labelWidth}
              labelPosition={props.labelPosition}
              isInverted={props.isInverted}
              height={props.height}
            />
          </SpacingsInline>
        </SpacingsInline>
      );
    case 'top':
    default:
      return (
        <SpacingsStack scale="m" alignItems="center">
          <ProgressBarLabel
            label={props.label}
            labelWidth={props.labelWidth}
            labelPosition={props.labelPosition}
            isInverted={props.isInverted}
            height={props.height}
          />
          <Bar
            progress={props.progress}
            barWidth={props.barWidth}
            isInverted={props.isInverted}
            height={props.height}
            isAnimated={props.isAnimated}
          />
        </SpacingsStack>
      );
  }
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
