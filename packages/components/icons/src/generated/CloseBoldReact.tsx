// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/close-bold.react.svg
import { ClassNames } from '@emotion/react';
import {
  getIconStyles,
  type TIconProps,
  type TSVGProps,
} from '@commercetools-uikit/design-system';
const SvgCloseBold = (props: TSVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <path d="m12 13.703-5.962 5.962q-.334.336-.852.335-.516 0-.851-.335T4 18.814q0-.517.335-.852L10.297 12 4.335 6.038Q4 5.704 4 5.186q0-.516.335-.851T5.186 4q.518 0 .852.335L12 10.297l5.962-5.962Q18.296 4 18.814 4q.516 0 .851.335.336.335.335.851 0 .518-.335.852L13.703 12l5.962 5.962q.336.334.335.852 0 .516-.335.851-.335.336-.851.335-.517 0-.852-.335z" />
  </svg>
);
SvgCloseBold.displayName = 'SvgCloseBold';
const CloseBoldIcon = (props: TIconProps) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgCloseBold {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
CloseBoldIcon.displayName = 'CloseBoldIcon';
export default CloseBoldIcon;
