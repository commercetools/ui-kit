// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/fraction-digits.react.svg
import { ClassNames } from '@emotion/react';
import {
  getIconStyles,
  type TIconProps,
  type TSVGProps,
} from '@commercetools-uikit/design-system';
const SvgFractionDigits = (props: TSVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <g fillRule="evenodd">
      <path
        fill="#1A1A1A"
        fillRule="nonzero"
        d="M4.686 11.162q0-.492.263-.744.264-.252.768-.252.486 0 .753.258.266.258.266.738 0 .463-.27.73-.269.266-.75.266-.491 0-.76-.26-.27-.261-.27-.736m9.158-3.445q0 2.244-.736 3.322-.735 1.078-2.264 1.078-1.483 0-2.236-1.113t-.753-3.287q0-2.268.733-3.343.732-1.075 2.256-1.075 1.482 0 2.241 1.125t.759 3.293m-4.19 0q0 1.576.273 2.259.272.682.917.682.633 0 .914-.691.28-.691.281-2.25 0-1.577-.284-2.265-.285-.688-.911-.688-.639 0-.914.688-.276.69-.276 2.265m11.04 0q0 2.244-.736 3.322-.735 1.078-2.265 1.078-1.482 0-2.235-1.113t-.753-3.287q0-2.268.732-3.343.733-1.075 2.256-1.075 1.483 0 2.242 1.125t.758 3.293m-4.19 0q0 1.576.272 2.259.273.682.917.682.633 0 .914-.691t.282-2.25q0-1.577-.285-2.265-.284-.688-.91-.688-.639 0-.915.688-.275.69-.275 2.265"
      />
      <g fill="#1A1A1A" fillRule="nonzero">
        <path d="m7.002 18.017-.004-2 10.5-.019.004 2z" />
        <path d="M16.945 13.581v6.869l4.145-3.466z" />
      </g>
    </g>
  </svg>
);
SvgFractionDigits.displayName = 'SvgFractionDigits';
const FractionDigitsIcon = (props: TIconProps) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgFractionDigits
        {...props}
        className={createClass(getIconStyles(props))}
      />
    )}
  </ClassNames>
);
FractionDigitsIcon.displayName = 'FractionDigitsIcon';
export default FractionDigitsIcon;
