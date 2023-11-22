import { ReactNode } from 'react';
import { css } from '@emotion/react';

export type TAccessibleHiddenProps = {
  children: ReactNode;
};

const AccessibleHidden = (props: TAccessibleHiddenProps) => (
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
