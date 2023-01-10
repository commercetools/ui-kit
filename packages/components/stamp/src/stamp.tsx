import type { ReactNode } from 'react';
import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';

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
};

export const availableTones: Tone[] = [
  'critical',
  'warning',
  'positive',
  'information',
  'primary',
  'secondary',
];

const tonesStylesMap = {
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
  if (!props.tone || !tonesStylesMap[props.tone]) {
    return css``;
  }

  const toneStyles = tonesStylesMap[props.tone || ''];
  return css`
    background-color: ${toneStyles.backgroundColor};
    border: 1px solid ${toneStyles.borderColor};
    color: ${toneStyles.color};
  `;
};

const getStampStyles = () => {
  return css`
    color: ${designTokens.colorSolid};
    font-size: ${designTokens.fontSizeForStamp};
    border-radius: ${designTokens.borderRadiusForStamp};
  `;
};

const Stamp = (props: Props) => (
  <div css={[getStampStyles(), getToneStyles(props), getPaddingStyle(props)]}>
    {props.children}
  </div>
);

const defaultProps: Pick<Props, 'isCondensed'> = {
  isCondensed: false,
};
Stamp.displayName = 'Stamp';
Stamp.defaultProps = defaultProps;

export default Stamp;
