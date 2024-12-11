// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/caret-up.react.svg
import { ClassNames } from '@emotion/react';
import {
  getIconStyles,
  type TIconProps,
  type TSVGProps,
} from '@commercetools-uikit/design-system';
const SvgCaretUp = (props: TSVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M3.334 17.37q.334.353.791.353h15.75q.457 0 .791-.354a1.18 1.18 0 0 0 .334-.838 1.18 1.18 0 0 0-.334-.837l-7.875-8.34A1.05 1.05 0 0 0 12 7q-.457 0-.791.354l-7.875 8.34A1.18 1.18 0 0 0 3 16.53q0 .484.334.838"
    />
  </svg>
);
SvgCaretUp.displayName = 'SvgCaretUp';
const CaretUpIcon = (props: TIconProps) => (
  /* #__PURE__ */ <ClassNames>
    {({ css: createClass }) => (
      <SvgCaretUp {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
CaretUpIcon.displayName = 'CaretUpIcon';
export default CaretUpIcon;
