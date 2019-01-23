import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';
import {
  HeadlineProps,
  SubheadlineProps,
  BodyProps,
  DetailProps,
  ElementTypeOfHeadline,
  ElementTypeOfSubheadline,
  ToneOfSubheadline,
  ToneOfBody,
  ToneOfDetail,
} from './types';

const baseStyles = `
  font-family: ${vars.fontFamilyDefault};
  color: ${vars.colorBlack};
`;

const truncate = `
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const bold = `
  font-weight: bold;
`;

const italic = `
  font-style: italic;
`;

const inline = `
  display: inline-block;
`;

const getTone = (tone: ToneOfSubheadline | ToneOfBody | ToneOfDetail) => {
  switch (tone) {
    case 'information':
      return `color: ${vars.colorBlue};`;
    case 'secondary':
      return `color: ${vars.colorGray60};`;
    case 'positive':
      return `color: ${vars.colorGreen25};`;
    case 'primary':
      return `color: ${vars.colorGreen};`;
    case 'negative':
      return `color: ${vars.colorRed};`;
    case 'inverted':
      return `color: ${vars.colorWhite};`;
    case 'warning':
      return `color: ${vars.colorOrange};`;
    default:
      return ``;
  }
};

const getElementFontSize = (
  elementType: ElementTypeOfHeadline | ElementTypeOfSubheadline
) => {
  switch (elementType) {
    case 'h1':
      return '32px';
    case 'h2':
      return '24px';
    case 'h3':
      return '20px';
    case 'h4':
      return '16px';
    case 'h5':
      return '14px';
    default:
      return '';
  }
};

export const bodyStyles = (props: BodyProps) => css`
  ${baseStyles}
  margin: 0;
  font-size: 13px;
  ${props.isBold && bold}
  ${props.isItalic && italic}
  ${props.tone && getTone(props.tone)}
  ${props.truncate && truncate}
`;

export const headlineStyles = (props: HeadlineProps) => css`
  ${baseStyles}
  margin: 0;
  font-size: ${getElementFontSize(props.elementType)};
  font-weight: 300;
  ${props.truncate && truncate}
`;

export const subheadlineStyles = (props: SubheadlineProps) => css`
  ${baseStyles}
  margin: 0;
  font-size: ${getElementFontSize(props.elementType)};
  font-weight: normal;
  ${props.truncate && truncate}
  ${props.isBold && bold}
  ${props.tone && getTone(props.tone)}
`;

export const wrapStyles = () => css`
  ${baseStyles}
  font-size: 13px;
  white-space: pre-wrap;
`;

export const detailStyles = (props: DetailProps) => css`
  ${baseStyles}
  display: block;
  font-size: 12px;
  ${props.isInline && inline}
  ${props.isBold && bold}
  ${props.isItalic && italic}
  ${props.tone && getTone(props.tone)}
  ${props.truncate && truncate}
`;
