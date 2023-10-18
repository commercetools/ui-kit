import { cloneElement, type ReactElement, type ReactNode } from 'react';
import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import Text from '@commercetools-uikit/text';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import { useWarnDeprecatedProp } from '@commercetools-uikit/utils';

export type TTone =
  | 'critical'
  | 'warning'
  | 'positive'
  | 'information'
  | 'primary'
  | 'secondary';

export type TStampProps = {
  /**
   * Indicates the color scheme of stamp
   */
  tone?: TTone;
  /**
   * If `true`, renders a condensed version of the stamp.
   */
  isCondensed: boolean;
  /**
   * Content to render within the stamp.
   * This property has been **deprecated** in favor of `label`.
   */
  children?: ReactNode;
  /**
   * Icon to render beside (left) the stamp text.
   */
  icon?: ReactElement;
  /**
   * Text to render within the stamp.
   */
  label?: string;
};

type ToneRelatedProps = {
  styles: {
    backgroundColor: string;
    borderColor: string;
    color: string;
  };
  iconColor: string;
};

type StylesFunctionParams = TStampProps & { overrideTextColor?: boolean };

const tonesPropsMap: Record<TTone, ToneRelatedProps> = {
  critical: {
    styles: {
      backgroundColor: designTokens.colorError95,
      borderColor: designTokens.borderColorForStampWhenError,
      color: designTokens.colorError40,
    },
    iconColor: 'error',
  },
  warning: {
    styles: {
      backgroundColor: designTokens.colorWarning95,
      borderColor: designTokens.borderColorForStampWhenWarning,
      color: designTokens.colorWarning40,
    },
    iconColor: 'warning',
  },
  positive: {
    styles: {
      backgroundColor: designTokens.backgroundColorForStampAsPositive,
      borderColor: designTokens.borderColorForStampAsPositive,
      color: designTokens.colorPrimary25,
    },
    iconColor: 'primary',
  },
  information: {
    styles: {
      backgroundColor: designTokens.colorInfo95,
      borderColor: designTokens.borderColorForStampAsInformation,
      color: designTokens.colorInfo40,
    },
    iconColor: 'info',
  },
  primary: {
    styles: {
      backgroundColor: designTokens.colorPrimary95,
      borderColor: designTokens.borderColorForStampAsPrimary,
      color: designTokens.colorPrimary25,
    },
    iconColor: 'primary40',
  },
  secondary: {
    styles: {
      backgroundColor: designTokens.colorNeutral95,
      borderColor: designTokens.borderColorForStampAsSecondary,
      color: designTokens.colorNeutral40,
    },
    iconColor: 'neutral60',
  },
};

export const availableTones: TTone[] = [
  'critical',
  'warning',
  'positive',
  'information',
  'primary',
  'secondary',
];
const getPaddingStyle = (props: StylesFunctionParams) => {
  if (props.isCondensed)
    return css`
      padding: ${designTokens.paddingForStampAsCondensed};
    `;
  return css`
    padding: ${designTokens.paddingForStamp};
  `;
};

const getIconColor = (
  props: StylesFunctionParams,
  overrideTextColor: boolean
) => {
  if (!overrideTextColor) {
    return 'inherit';
  }

  const toneProps = props.tone && tonesPropsMap[props.tone];
  return toneProps ? toneProps.iconColor : '';
};

const getToneStyles = (props: StylesFunctionParams) => {
  if (!props.tone || !tonesPropsMap[props.tone]) {
    return css``;
  }

  const toneProps = tonesPropsMap[props.tone];
  return css`
    background-color: ${toneProps.styles.backgroundColor};

    &,
    & * {
      color: ${props.overrideTextColor ? toneProps.styles.color : 'inherit'};
    }
  `;
};

const getStampStyles = (props: StylesFunctionParams) => {
  return css`
    color: ${props.overrideTextColor ? 'inherit' : designTokens.colorSolid};
    display: inline-block;
    border-radius: ${props.isCondensed
      ? designTokens.borderRadiusForStampAsCondensed
      : designTokens.borderRadiusForStamp};
  `;
};

const Stamp = (props: TStampProps) => {
  const Icon =
    props.icon &&
    cloneElement(props.icon, {
      size: 'medium',
      color: getIconColor(props, true),
    });

  useWarnDeprecatedProp(
    !Boolean(props.children),
    'children',
    'Stamp',
    'Please use `label` and `icon` properties instead.'
  );

  const StampLabel = ({ children }: { children: string }): ReactElement =>
    props.isCondensed ? (
      <Text.Caption tone="inherit" fontWeight="medium">
        {children}
      </Text.Caption>
    ) : (
      <Text.Detail tone="inherit" fontWeight="medium">
        {children}
      </Text.Detail>
    );

  return (
    <div
      css={[
        getStampStyles({ ...props, overrideTextColor: true }),
        getToneStyles({ ...props, overrideTextColor: true }),
        getPaddingStyle(props),
      ]}
    >
      <SpacingsInline alignItems="center">
        {Icon}
        {props.label ? <StampLabel>{props.label}</StampLabel> : props.children}
      </SpacingsInline>
    </div>
  );
};
const defaultProps: Pick<TStampProps, 'isCondensed' | 'tone'> = {
  isCondensed: false,
  tone: 'information',
};
Stamp.displayName = 'Stamp';
Stamp.defaultProps = defaultProps;

export default Stamp;
