import { css } from '@emotion/core';
import vars from '../../../materials/custom-properties';

export const getWrapperStyles = () => css`
  box-sizing: content-box;
  max-height: 150px;
  opacity: 1;
  visibility: visible;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  cursor: default;
  pointer-events: none;
  z-index: 99;
  font-size: 1rem;
  font-family: ${vars.fontFamilyDefault};
  display: block;

  &[aria-hidden='true'] {
    display: none;
  }
`;

export const getBodyStyles = () => css`
  border-radius: 5px;
  min-width: 100px;
  background-color: ${vars.colorWhite};
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.12), 0 3px 3px 0 rgba(0, 0, 0, 0.24);
  vertical-align: middle;
  font-size: 0.857rem;
`;
