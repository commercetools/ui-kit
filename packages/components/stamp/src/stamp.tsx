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
  isCondensed?: boolean;
  /**
   * Content to render within the stamp.
   * @deprecated in favor of `label`.
   */
  children?: ReactNode;
  /**
   * Icon to render beside (left) the stamp text.
   */
  icon?: ReactElement<{ size?: string; color?: string }>;
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

const tonesPropsMap = (): Record<TTone, ToneRelatedProps> => ({
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
      backgroundColor: designTokens.colorSuccess95,
      borderColor: designTokens.colorPrimary85,
      color: designTokens.colorSuccess40,
    },
    iconColor: 'success',
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
      backgroundColor: designTokens.colorPrimary95,
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
  overrideTextColor: boolean
) => {
  if (!overrideTextColor) {
    return 'inherit';
  }

  const toneProps = props.tone && tonesPropsMap()[props.tone];
  return toneProps ? toneProps.iconColor : '';
};

const getToneStyles = (props: StylesFunctionParams) => {
  if (!props.tone || !tonesPropsMap()[props.tone]) {
    return css``;
  }

  const toneProps = tonesPropsMap()[props.tone];
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

const Stamp = ({
  isCondensed = false,
  tone = 'information',
  ...props
}: TStampProps) => {
  const allProps = { isCondensed, tone, ...props };
  const Icon =
    props.icon &&
    cloneElement(props.icon, {
      size: '20',
      color: getIconColor(allProps, true),
    });

  useWarnDeprecatedProp(
    !Boolean(props.children),
    'children',
    'Stamp',
    'Please use `label` and `icon` properties instead.'
  );

  const StampLabel = ({ children }: { children: string }): ReactElement =>
    isCondensed ? (
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
        getStampStyles({ ...allProps, overrideTextColor: true }),
        getToneStyles({ ...allProps, overrideTextColor: true }),
        getPaddingStyle({
          isCondensed,
          tone,
          ...props,
        }),
      ]}
    >
      <SpacingsInline alignItems="center" scale={isCondensed ? 'xs' : 's'}>
        {Icon}
        {props.label ? <StampLabel>{props.label}</StampLabel> : props.children}
      </SpacingsInline>
    </div>
  );
};
Stamp.displayName = 'Stamp';

export default Stamp;
