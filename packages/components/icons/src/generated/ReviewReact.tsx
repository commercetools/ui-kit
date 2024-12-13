// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/review.react.svg
import { ClassNames } from '@emotion/react';
import {
  getIconStyles,
  type TIconProps,
  type TSVGProps,
} from '@commercetools-uikit/design-system';
const SvgReview = (props: TSVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <path d="m11.233 14.813-1.26-1.26a.9.9 0 0 0-.293-.203.8.8 0 0 0-.326-.067.9.9 0 0 0-.641.27.88.88 0 0 0-.27.641q0 .37.27.641l1.912 1.935q.135.136.293.19a1 1 0 0 0 .337.057q.18 0 .337-.056a.8.8 0 0 0 .293-.191l3.803-3.802q.27-.27.27-.653a.9.9 0 0 0-.27-.652.9.9 0 0 0-.653-.27.9.9 0 0 0-.652.27zM6.8 21q-.743 0-1.27-.528A1.73 1.73 0 0 1 5 19.2V4.8q0-.742.53-1.272A1.73 1.73 0 0 1 6.8 3h6.458a1.78 1.78 0 0 1 1.26.518l4.365 4.365q.247.247.382.573.135.327.135.687V19.2q0 .743-.528 1.272A1.74 1.74 0 0 1 17.6 21zm6.3-12.6V4.8H6.8v14.4h10.8V9.3H14a.87.87 0 0 1-.64-.26.87.87 0 0 1-.26-.64M6.8 4.8v4.5zv14.4z" />
  </svg>
);
SvgReview.displayName = 'SvgReview';
const ReviewIcon = (props: TIconProps) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgReview {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
ReviewIcon.displayName = 'ReviewIcon';
export default ReviewIcon;
