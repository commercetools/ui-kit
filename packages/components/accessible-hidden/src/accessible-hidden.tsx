import React, { ReactNode } from 'react';
import { css } from '@emotion/react';

type Props = {
  children: ReactNode;
};

const AccessibleHidden = (props: Props) => (
  <div
    css={css`
      clip: rect(0 0 0 0);
      width: 1px;
      height: 1px;
      margin: -1px;
      border: 0;
      padding: 0;
      overflow: hidden;
      position: absolute;
      white-space: nowrap;
    `}
    {...props}
  />
);
AccessibleHidden.displayName = 'AccessibleHidden';

export default AccessibleHidden;
