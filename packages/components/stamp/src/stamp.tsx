import type { Theme } from '@emotion/react';

import React, { FC, ReactNode } from 'react';
import { css, useTheme } from '@emotion/react';
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
  tone: Tone;
  /**
   * If `true`, renders a condensed version of the stamp.
   */
  isCondensed?: boolean;
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

const getToneStyles = (props: Props, theme: Theme) => {
  const overwrittenVars = { ...vars, ...theme };

  switch (props.tone) {
    case 'critical': {
      return css`
        background-color: ${overwrittenVars.colorError95};
        border: 1px solid ${overwrittenVars.colorError};
      `;
    }
    case 'warning': {
      return css`
        background-color: ${overwrittenVars.colorWarning95};
        border: 1px solid ${overwrittenVars.colorWarning};
      `;
    }
    case 'positive': {
      return css`
        background-color: ${overwrittenVars.colorPrimary85};
        border: 1px solid ${overwrittenVars.colorPrimary40};
      `;
    }
    case 'information': {
      return css`
        background-color: ${overwrittenVars.colorInfo95};
        border: 1px solid ${overwrittenVars.colorInfo};
      `;
    }
    case 'primary': {
      return css`
        background-color: ${overwrittenVars.colorPrimary95};
        border: 1px solid ${overwrittenVars.colorPrimary25};
      `;
    }
    case 'secondary': {
      return css`
        background-color: ${overwrittenVars.colorNeutral90};
        border: 1px solid ${overwrittenVars.colorNeutral60};
      `;
    }
    default:
      return css``;
  }
};

const getStampStyles = (_props: Props, theme: Theme) => {
  const overwrittenVars = { ...vars, ...theme };

  return css`
    color: ${overwrittenVars.colorSolid};
    font-size: ${overwrittenVars.fontSizeDefault};
    border-radius: ${overwrittenVars.borderRadius2};
  `;
};

const Stamp: FC<Props> = (props) => {
  const theme = useTheme();
  return (
    <div
      css={[
        getStampStyles(props, theme),
        getToneStyles(props, theme),
        getPaddingStyle(props),
      ]}
    >
      {props.children}
    </div>
  );
};
Stamp.displayName = 'Stamp';

export default Stamp;
