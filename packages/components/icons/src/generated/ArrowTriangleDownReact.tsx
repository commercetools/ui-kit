// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/arrow-triangle-down.react.svg
import { ClassNames } from '@emotion/react';
import {
  getIconStyles,
  type TIconProps,
  type TSVGProps,
} from '@commercetools-uikit/design-system';
const SvgArrowTriangleDown = (props: TSVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <path fillRule="evenodd" d="M12 20 3 5h18" />
  </svg>
);
SvgArrowTriangleDown.displayName = 'SvgArrowTriangleDown';
const ArrowTriangleDownIcon = (props: TIconProps) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgArrowTriangleDown
        {...props}
        className={createClass(getIconStyles(props))}
      />
    )}
  </ClassNames>
);
ArrowTriangleDownIcon.displayName = 'ArrowTriangleDownIcon';
export default ArrowTriangleDownIcon;
