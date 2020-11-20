import { css } from '@emotion/react';

const accessibleHiddenInputStyles = css`
  pointer-events: none;
  height: 100%;
  left: 0;
  opacity: 0.0001;
  position: absolute;
  top: 0;
  width: 100%;
`;

export default accessibleHiddenInputStyles;
