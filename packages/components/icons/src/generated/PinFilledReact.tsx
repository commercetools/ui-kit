// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/pin-filled.react.svg
import { ClassNames } from '@emotion/react';
import {
  getIconStyles,
  type TIconProps,
  type TSVGProps,
} from '@commercetools-uikit/design-system';
const SvgPinFilled = (props: TSVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <path d="m16 11.1 1.8 1.8v1.8h-4.5v5.4l-.9.9-.9-.9v-5.4H7v-1.8l1.8-1.8V4.8h-.9V3h9v1.8H16z" />
  </svg>
);
SvgPinFilled.displayName = 'SvgPinFilled';
const PinFilledIcon = (props: TIconProps) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgPinFilled {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
PinFilledIcon.displayName = 'PinFilledIcon';
export default PinFilledIcon;
