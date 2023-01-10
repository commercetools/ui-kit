// TODO: @redesign cleanup
import type { ReactNode } from 'react';
import { css } from '@emotion/react';
import { designTokens, useTheme } from '@commercetools-uikit/design-system';

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
  overrideTextColor?: boolean;
};

export const availableTones: Tone[] = [
  'critical',
  'warning',
  'positive',
  'information',
  'primary',
  'secondary',
];
const getPaddingStyle = (props: Props) => {
  if (props.isCondensed)
    return css`
      padding: ${designTokens.paddingForStampAsCondensed};
    `;
  return css`
    padding: ${designTokens.paddingForStamp};
  `;
};

const getToneStyles = (props: Props) => {
  switch (props.tone) {
    case 'critical': {
      return css`
        background-color: ${designTokens.colorError95};
        border: 1px solid ${designTokens.borderColorForStampWhenError};
        &,
        & * {
          color: ${props.overrideTextColor
            ? designTokens.colorError40 + '!important'
            : 'inherit'};
        }
      `;
    }
    case 'warning': {
      return css`
        background-color: ${designTokens.colorWarning95};
        border: 1px solid ${designTokens.borderColorForStampWhenWarning};
        &,
        & * {
          color: ${props.overrideTextColor
            ? designTokens.colorWarning40 + '!important'
            : 'inherit'};
        }
      `;
    }
    case 'positive': {
      return css`
        background-color: ${designTokens.backgroundColorForStampAsPositive};
        border: 1px solid ${designTokens.borderColorForStampAsPositive};
        &,
        & * {
          color: ${props.overrideTextColor
            ? designTokens.colorPrimary25 + '!important'
            : 'inherit'};
        }
      `;
    }
    case 'information': {
      return css`
        background-color: ${designTokens.colorInfo95};
        border: 1px solid ${designTokens.borderColorForStampAsInformation};
        &,
        & * {
          color: ${props.overrideTextColor
            ? designTokens.colorInfo40 + '!important'
            : 'inherit'};
        }
      `;
    }
    case 'primary': {
      return css`
        background-color: ${designTokens.colorPrimary95};
        border: 1px solid ${designTokens.borderColorForStampAsPrimary};
        &,
        & * {
          color: ${props.overrideTextColor
            ? designTokens.colorPrimary25 + '!important'
            : 'inherit'};
        }
      `;
    }
    case 'secondary': {
      return css`
        background-color: ${designTokens.colorNeutral95};
        border: 1px solid ${designTokens.borderColorForStampAsSecondary};
        &,
        & * {
          color: ${props.overrideTextColor
            ? designTokens.colorNeutral40 + '!important'
            : 'inherit'};
        }
      `;
    }
    default:
      return css``;
  }
};

const getStampStyles = (props: Props) => {
  return css`
    color: ${props.overrideTextColor ? 'inherit' : designTokens.colorSolid};
    font-size: ${designTokens.fontSizeForStamp};
    border-radius: ${designTokens.borderRadiusForStamp};
  `;
};

const Stamp = (props: Props) => {
  const { themedValue } = useTheme();
  const overrideTextColor = props.overrideTextColor ?? themedValue(false, true);

  return (
    <div
      css={[
        getStampStyles({ ...props, overrideTextColor }),
        getToneStyles({ ...props, overrideTextColor }),
        getPaddingStyle(props),
      ]}
    >
      {props.children}
    </div>
  );
};
const defaultProps: Pick<Props, 'isCondensed'> = {
  isCondensed: false,
};
Stamp.displayName = 'Stamp';
Stamp.defaultProps = defaultProps;

export default Stamp;
