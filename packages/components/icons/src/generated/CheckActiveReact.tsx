// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/check-active.react.svg
import { ClassNames } from '@emotion/react';
import {
  getIconStyles,
  type TIconProps,
  type TSVGProps,
} from '@commercetools-uikit/design-system';
const SvgCheckActive = (props: TSVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <path d="m10.74 13.62-1.957-1.957a.83.83 0 0 0-.608-.248q-.36 0-.63.27a.85.85 0 0 0-.247.63q0 .383.247.63l2.565 2.565a.85.85 0 0 0 .63.248.85.85 0 0 0 .63-.248l5.108-5.107a.83.83 0 0 0 .247-.608q0-.36-.27-.63a.85.85 0 0 0-.63-.247.85.85 0 0 0-.63.247zM12 21a8.8 8.8 0 0 1-3.51-.71 9.1 9.1 0 0 1-2.857-1.922 9.1 9.1 0 0 1-1.924-2.858A8.8 8.8 0 0 1 3 12q0-1.867.71-3.51a9.1 9.1 0 0 1 1.923-2.857A9.1 9.1 0 0 1 8.49 3.708 8.8 8.8 0 0 1 12 3q1.867 0 3.51.708a9.1 9.1 0 0 1 2.858 1.925A9.1 9.1 0 0 1 20.29 8.49 8.8 8.8 0 0 1 21 12a8.8 8.8 0 0 1-.71 3.51 9.1 9.1 0 0 1-1.922 2.858 9.1 9.1 0 0 1-2.858 1.923A8.8 8.8 0 0 1 12 21" />
  </svg>
);
SvgCheckActive.displayName = 'SvgCheckActive';
const CheckActiveIcon = (props: TIconProps) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgCheckActive
        {...props}
        className={createClass(getIconStyles(props))}
      />
    )}
  </ClassNames>
);
CheckActiveIcon.displayName = 'CheckActiveIcon';
export default CheckActiveIcon;
