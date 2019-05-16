import { css } from '@emotion/core';

const accessibleHiddenInputStyles = css`
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  opacity: 0;
  height: 100%;
  width: 100%;
  cursor: inherit;
`;

export default accessibleHiddenInputStyles;
