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
  children: ReactNode;
  icon?: ReactElement;
  message?: MessageDescriptor & {
    values?: Record<string, ReactNode>;
  };
};

type toneStylesCssProperties = {
  backgroundColor: string;
  borderColor: string;
  color: string;
};

type StylesFunctionParams = Props & { overrideTextColor?: boolean };

const tonesStylesMap: Record<Tone, toneStylesCssProperties> = {
  critical: {
    backgroundColor: designTokens.colorError95,
    borderColor: designTokens.borderColorForStampWhenError,
    color: designTokens.colorError40,
  },
  warning: {
    backgroundColor: designTokens.colorWarning95,
    borderColor: designTokens.borderColorForStampWhenWarning,
    color: designTokens.colorWarning40,
  },
  positive: {
    backgroundColor: designTokens.backgroundColorForStampAsPositive,
    borderColor: designTokens.borderColorForStampAsPositive,
    color: designTokens.colorPrimary25,
  },
  information: {
    backgroundColor: designTokens.colorInfo95,
    borderColor: designTokens.borderColorForStampAsInformation,
    color: designTokens.colorInfo40,
  },
  primary: {
    backgroundColor: designTokens.colorPrimary95,
    borderColor: designTokens.borderColorForStampAsPrimary,
    color: designTokens.colorPrimary25,
  },
  secondary: {
    backgroundColor: designTokens.colorNeutral95,
    borderColor: designTokens.borderColorForStampAsSecondary,
    color: designTokens.colorNeutral40,
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

const getIconColor = (props: Props, overrideTextColor: boolean) => {
  if (!overrideTextColor) {
    return 'inherit';
  }
  switch (props.tone) {
    case 'secondary':
      return 'neutral60';
    case 'primary':
      return 'primary40';
    case 'information':
      return 'info';
    case 'positive':
      return 'primary';
    case 'warning':
      return 'warning';
    case 'critical':
      return 'error';
    default:
      return '';
  }
};

const getToneStyles = (props: StylesFunctionParams) => {
  if (!props.tone || !tonesStylesMap[props.tone]) {
    return css``;
  }

  const toneStyles = tonesStylesMap[props.tone];
  return css`
    background-color: ${toneStyles.backgroundColor};
    border: 1px solid ${toneStyles.borderColor};
    &,
    & * {
      color: ${props.overrideTextColor ? toneStyles.color : 'inherit'};
    }
  `;
};

const getStampStyles = (props: StylesFunctionParams) => {
  return css`
    color: ${props.overrideTextColor ? 'inherit' : designTokens.colorSolid};
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

  if (props.message && props.children) {
    warning(
      !props.message && !props.children,
      'Stamp: `children` prop is ignored as `message` was provided and it has more priority'
    );
  }
  if (props.children) {
    warning(
      !props.children,
      'Stamp: Please pass messages or icons as inline props, this method will be deprecated soon. For more information, see documentation: https://uikit.commercetools.com/?path=/story/components-stamps--stamp'
    );
  }
  if (props.message) {
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
          <Text.Detail
            tone={themedValue(undefined, 'inherit')}
            intlMessage={props.message}
          />
        </SpacingsInline>
      </div>
    );
  }
  return (
    <>
      <div
        css={[
          getStampStyles({ ...props, overrideTextColor }),
          getToneStyles({ ...props, overrideTextColor }),
          getPaddingStyle(props),
        ]}
      >
        {props.children}
      </div>
    </>
  );
};
const defaultProps: Pick<Props, 'isCondensed'> = {
  isCondensed: false,
};
Stamp.displayName = 'Stamp';
Stamp.defaultProps = defaultProps;

export default Stamp;
