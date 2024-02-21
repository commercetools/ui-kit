import { cloneElement, type ReactElement, type ReactNode } from 'react';
import { css } from '@emotion/react';
import {
  designTokens,
  useTheme,
  type TUseThemeResult,
} from '@commercetools-uikit/design-system';
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

const tonesPropsMap = (
  themedValue: TUseThemeResult['themedValue']
): Record<TTone, ToneRelatedProps> => ({
  critical: {
    styles: {
      backgroundColor: designTokens.colorError95,
      borderColor: designTokens.colorError85,
      color: designTokens.colorError40,
    },
    iconColor: 'error',
  },
  warning: {
    styles: {
      backgroundColor: designTokens.colorWarning95,
      borderColor: designTokens.colorWarning85,
      color: designTokens.colorWarning40,
    },
    iconColor: 'warning',
  },
  positive: {
    styles: {
      backgroundColor: designTokens.backgroundColorForStampAsPositive,
      borderColor: designTokens.colorPrimary85,
      color: designTokens.fontColorForStampAsPositive,
    },
    iconColor: themedValue('primary', 'success'),
  },
  information: {
    styles: {
      backgroundColor: designTokens.colorInfo95,
      borderColor: designTokens.colorInfo85,
      color: designTokens.colorInfo40,
    },
    iconColor: 'info',
  },
  primary: {
    styles: {
      backgroundColor: designTokens.backgroundColorForStampAsPrimary,
      borderColor: designTokens.colorPrimary85,
      color: designTokens.colorPrimary25,
    },
    iconColor: 'primary40',
  },
  secondary: {
    styles: {
      backgroundColor: designTokens.colorNeutral95,
      borderColor: designTokens.colorNeutral85,
      color: designTokens.colorNeutral40,
    },
    iconColor: 'neutral60',
  },
});

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
      padding: ${designTokens.spacing05} ${designTokens.spacing10};
    `;
  return css`
    padding: ${designTokens.spacing10} ${designTokens.spacing25};
  `;
};

const getIconColor = (
  props: StylesFunctionParams,
  overrideTextColor: boolean,
  themedValue: TUseThemeResult['themedValue']
) => {
  if (!overrideTextColor) {
    return 'inherit';
  }

  const toneProps = props.tone && tonesPropsMap(themedValue)[props.tone];
  return toneProps ? toneProps.iconColor : '';
};

const getToneStyles = (
  props: StylesFunctionParams,
  themedValue: TUseThemeResult['themedValue']
) => {
  if (!props.tone || !tonesPropsMap(themedValue)[props.tone]) {
    return css``;
  }

  const toneProps = tonesPropsMap(themedValue)[props.tone];
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
      ? designTokens.borderRadius2
      : designTokens.borderRadius4};
  `;
};

const Stamp = (props: TStampProps) => {
  const { themedValue } = useTheme();
  const Icon =
    props.icon &&
    cloneElement(props.icon, {
      size: 'medium',
      color: getIconColor(props, true, themedValue),
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
        getToneStyles({ ...props, overrideTextColor: true }, themedValue),
        getPaddingStyle(props),
      ]}
    >
      <SpacingsInline
        alignItems="center"
        scale={props.isCondensed ? 'xs' : 's'}
      >
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
