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

const getToneStyles = (props: Props & { isNewTheme: boolean }) => {
  switch (props.tone) {
    case 'critical': {
      return css`
        background-color: ${designTokens.colorError95};
        border: 1px solid
          ${props.isNewTheme
            ? designTokens.borderForStampWhenError
            : designTokens.colorError};
      `;
    }
    case 'warning': {
      return css`
        background-color: ${designTokens.colorWarning95};
        border: 1px solid
          ${props.isNewTheme
            ? designTokens.borderForStampWhenWarning
            : designTokens.colorWarning};
      `;
    }
    case 'positive': {
      return css`
        background-color: ${designTokens.colorPrimary85};
        border: 1px solid
          ${props.isNewTheme
            ? designTokens.borderForStampAsPositive
            : designTokens.colorPrimary40};
      `;
    }
    case 'information': {
      return css`
        background-color: ${designTokens.colorInfo95};
        border: 1px solid
          ${props.isNewTheme
            ? designTokens.borderForStampAsInformation
            : designTokens.colorInfo};
      `;
    }
    case 'primary': {
      return css`
        background-color: ${designTokens.colorPrimary95};
        border: 1px solid
          ${props.isNewTheme
            ? designTokens.borderForStampAsPrimary
            : designTokens.colorPrimary25};
      `;
    }
    case 'secondary': {
      return css`
        background-color: ${designTokens.colorNeutral90};
        border: 1px solid
          ${props.isNewTheme
            ? designTokens.borderForStampAsSecondary
            : designTokens.colorNeutral60};
      `;
    }
    default:
      return css``;
  }
};

const getStampStyles = (props: Props & { isNewTheme: boolean }) => {
  return css`
    color: ${designTokens.colorSolid};
    font-size: ${designTokens.fontSizeForStamp};
    border-radius: ${props.isNewTheme
      ? designTokens.borderRadiusForStamp
      : designTokens.borderRadius2};
  `;
};

const Stamp = (props: Props & { isNewTheme: boolean }) => {
  const { isNewTheme } = useTheme();
  return (
    <div
      css={[
        getStampStyles({ ...props, isNewTheme }),
        getToneStyles({ ...props, isNewTheme }),
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
