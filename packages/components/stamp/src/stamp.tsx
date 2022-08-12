import type { ReactNode } from 'react';
import { css } from '@emotion/react';
import { customProperties } from '@commercetools-uikit/design-system';

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
      padding: 1px ${customProperties.spacingXs};
    `;
  return css`
    padding: ${customProperties.spacingXs} ${customProperties.spacingS};
  `;
};

const getToneStyles = (props: Props) => {
  switch (props.tone) {
    case 'critical': {
      return css`
        background-color: ${customProperties.colorError95};
        border: 1px solid ${customProperties.colorError};
      `;
    }
    case 'warning': {
      return css`
        background-color: ${customProperties.colorWarning95};
        border: 1px solid ${customProperties.colorWarning};
      `;
    }
    case 'positive': {
      return css`
        background-color: ${customProperties.colorPrimary85};
        border: 1px solid ${customProperties.colorPrimary40};
      `;
    }
    case 'information': {
      return css`
        background-color: ${customProperties.colorInfo95};
        border: 1px solid ${customProperties.colorInfo};
      `;
    }
    case 'primary': {
      return css`
        background-color: ${customProperties.colorPrimary95};
        border: 1px solid ${customProperties.colorPrimary25};
      `;
    }
    case 'secondary': {
      return css`
        background-color: ${customProperties.colorNeutral90};
        border: 1px solid ${customProperties.colorNeutral60};
      `;
    }
    default:
      return css``;
  }
};

const getStampStyles = (_props: Props) => {
  return css`
    color: ${customProperties.colorSolid};
    font-size: ${customProperties.fontSizeDefault};
    border-radius: ${customProperties.borderRadius2};
  `;
};

const Stamp = (props: Props) => {
  return (
    <div
      css={[
        getStampStyles(props),
        getToneStyles(props),
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
