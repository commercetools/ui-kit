import { css } from '@emotion/core';
import vars from '../../../materials/custom-properties';

const getPositionStyles = ({ position }) => {
  switch (position) {
    case 'top': {
      return css`
        transform: translateY(-100%) translateY(-3px);
      `;
    }
    case 'top-right': {
      return css`
        transform: translate(0, calc(-100% - 10px));
        right: 0;
      `;
    }
    case 'bottom': {
      return css`
        top: calc(100% + 10px);
      `;
    }
    case 'bottom-left': {
      return css`
        transform: translateX(-100%) translateX(-10px) translateY(-6px);
      `;
    }
    default:
      return css``;
  }
};

export const getWrapperStyles = ({ position }) => [
  css`
    box-sizing: content-box;
    max-height: 150px;
    opacity: 1;
    visibility: visible;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    cursor: default;
  `,
  getPositionStyles({ position }),
];

const getBorderColor = ({ type }) => {
  switch (type) {
    case 'info':
      return vars.colorGreen;
    case 'warning':
      return vars.colorOrange;
    case 'error':
      return vars.colorRed;
    default:
      return '';
  }
};

export const getBodyStyles = ({ type, position }) => [
  css`
    border-radius: 5px;
    min-width: 100px;
    font-family: ${vars.fontFamilyDefault};
    border: solid 1px ${getBorderColor({ type })};
    padding: 6px;
    background-color: ${vars.colorWhite};
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.12), 0 3px 3px 0 rgba(0, 0, 0, 0.24);
    vertical-align: middle;
    font-size: 0.857rem;

    &[aria-hidden='true'] {
      display: none;
    }
  `,
];
