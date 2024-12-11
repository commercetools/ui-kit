// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/caret-down-small.react.svg
import { ClassNames } from '@emotion/react';
import {
  getIconStyles,
  type TIconProps,
  type TSVGProps,
} from '@commercetools-uikit/design-system';
const SvgCaretDownSmall = (props: TSVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <path
      fill="#1A1A1A"
      fillRule="evenodd"
      d="M16.814 9.198a.58.58 0 0 0-.44-.198H7.626a.58.58 0 0 0-.44.198.66.66 0 0 0-.185.469q0 .27.186.468l4.374 4.667a.583.583 0 0 0 .88 0l4.374-4.667A.66.66 0 0 0 17 9.667a.66.66 0 0 0-.186-.47"
      clipRule="evenodd"
    />
  </svg>
);
SvgCaretDownSmall.displayName = 'SvgCaretDownSmall';
const CaretDownSmallIcon = (props: TIconProps) => (
  /* #__PURE__ */ <ClassNames>
    {({ css: createClass }) => (
      <SvgCaretDownSmall
        {...props}
        className={createClass(getIconStyles(props))}
      />
    )}
  </ClassNames>
);
CaretDownSmallIcon.displayName = 'CaretDownSmallIcon';
export default CaretDownSmallIcon;
