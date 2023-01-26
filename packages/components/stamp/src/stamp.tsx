// TODO: @redesign cleanup
import { cloneElement, type ReactElement, type ReactNode } from 'react';
import { css } from '@emotion/react';
import { designTokens, useTheme } from '@commercetools-uikit/design-system';
import type { MessageDescriptor } from 'react-intl';
import Text from '@commercetools-uikit/text';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import { warning } from '@commercetools-uikit/utils';

type Tone =
  | 'critical'
  | 'warning'
  | 'positive'
  | 'information'
  | 'primary'
  | 'secondary';

type Props = {
  /**
   * Indicates the color scheme of stamp
   */
  tone?: Tone;
  /**
   * If `true`, renders a condensed version of the stamp.
   */
  isCondensed: boolean;
  children?: ReactNode;
  icon?: ReactElement;
  label?: string;
  intlMessage?: MessageDescriptor & {
    values?: Record<string, ReactNode>;
  };
};

type ToneRelatedProps = {
  styles: {
    backgroundColor: string;
    borderColor: string;
    color: string;
  };
  iconColor: string;
};

type StylesFunctionParams = Props & { overrideTextColor?: boolean };

const tonesPropsMap: Record<Tone, ToneRelatedProps> = {
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

export const availableTones: Tone[] = [
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
    border: 1px solid ${toneProps.styles.borderColor};
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
    font-size: ${designTokens.fontSizeForStamp};
    border-radius: ${designTokens.borderRadiusForStamp};
  `;
};

const Stamp = (props: Props) => {
  const { themedValue } = useTheme();
  const overrideTextColor = themedValue(false, true);
  const Icon =
    props.icon &&
    cloneElement(props.icon, {
      size: 'medium',
      color: getIconColor(props, overrideTextColor),
    });

  warning(
    !props.children,
    'Stamp: The `children` prop has been deprecated. Please use the `intlMessage` and `icon` prop to render the content.'
  );

  const getStampText = (props: Props) => {
    if (props.intlMessage)
      return (
        <Text.Detail
          tone={themedValue(undefined, 'inherit')}
          intlMessage={props.intlMessage}
        />
      );
    if (props.label)
      return (
        <Text.Detail tone={themedValue(undefined, 'inherit')}>
          {props.label}
        </Text.Detail>
      );
    return props.children;
  };

  return (
    <div
      css={[
        getStampStyles({ ...props, overrideTextColor }),
        getToneStyles({ ...props, overrideTextColor }),
        getPaddingStyle(props),
      ]}
    >
      <SpacingsInline alignItems="center">
        {Icon}
        {getStampText(props)}
      </SpacingsInline>
    </div>
  );
};
const defaultProps: Pick<Props, 'isCondensed' | 'tone'> = {
  isCondensed: false,
  tone: 'information',
};
Stamp.displayName = 'Stamp';
Stamp.defaultProps = defaultProps;

export default Stamp;
