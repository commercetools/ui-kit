import type { ReactNode } from 'react';
import { css } from '@emotion/react';
import { customProperties as vars } from '@commercetools-uikit/design-system';

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
      padding: 1px ${vars.spacingXs};
    `;
  return css`
    padding: ${vars.spacingXs} ${vars.spacingS};
  `;
};

const getToneStyles = (props: Props) => {
  switch (props.tone) {
    case 'critical': {
      return css`
        background-color: ${vars.colorError95};
        border: 1px solid ${vars.colorError};
      `;
    }
    case 'warning': {
      return css`
        background-color: ${vars.colorWarning95};
        border: 1px solid ${vars.colorWarning};
      `;
    }
    case 'positive': {
      return css`
        background-color: ${vars.colorPrimary85};
        border: 1px solid ${vars.colorPrimary40};
      `;
    }
    case 'information': {
      return css`
        background-color: ${vars.colorInfo95};
        border: 1px solid ${vars.colorInfo};
      `;
    }
    case 'primary': {
      return css`
        background-color: ${vars.colorPrimary95};
        border: 1px solid ${vars.colorPrimary25};
      `;
    }
    case 'secondary': {
      return css`
        background-color: ${vars.colorNeutral90};
        border: 1px solid ${vars.colorNeutral60};
      `;
    }
    default:
      return css``;
  }
};

const getStampStyles = (_props: Props) => {
  return css`
    color: ${vars.colorSolid};
    font-size: ${vars.fontSizeDefault};
    border-radius: ${vars.borderRadius2};
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
