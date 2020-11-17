import { css } from '@emotion/react';

// resets button styles given automatically by browsers
const getNormalizedButtonStyles = () => css`
  display: inline-block;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  border: none;
  cursor: pointer;
  background: none;
  color: inherit;
  white-space: nowrap;
  font: inherit;
  font-size: inherit;
  font-family: inherit;
  letter-spacing: inherit;
  word-spacing: inherit;
  text-decoration: none;
  text-rendering: inherit;
  text-align: inherit;
  text-transform: inherit;
  text-indent: inherit;
  text-shadow: inherit;
`;

export default getNormalizedButtonStyles;
