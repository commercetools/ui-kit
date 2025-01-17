// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/external-link.react.svg
import { ClassNames } from '@emotion/react';
import {
  getIconStyles,
  type TIconProps,
  type TSVGProps,
} from '@commercetools-uikit/design-system';
const SvgExternalLink = (props: TSVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <path d="M5 21q-.825 0-1.413-.587A1.93 1.93 0 0 1 3 19V5q0-.825.587-1.413A1.93 1.93 0 0 1 5 3h7v2H5v14h14v-7h2v7q0 .825-.587 1.413A1.93 1.93 0 0 1 19 21zm4.7-5.3-1.4-1.4L17.6 5H14V3h7v7h-2V6.4z" />
  </svg>
);
SvgExternalLink.displayName = 'SvgExternalLink';
const ExternalLinkIcon = (props: TIconProps) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgExternalLink
        {...props}
        className={createClass(getIconStyles(props))}
      />
    )}
  </ClassNames>
);
ExternalLinkIcon.displayName = 'ExternalLinkIcon';
export default ExternalLinkIcon;
