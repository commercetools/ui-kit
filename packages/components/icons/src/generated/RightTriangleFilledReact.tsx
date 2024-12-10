// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/right-triangle-filled.react.svg
import { ClassNames } from '@emotion/react';
import {
  getIconStyles,
  type TIconProps,
  type TSVGProps,
} from '@commercetools-uikit/design-system';
const SvgRightTriangleFilled = (props: TSVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <path d="M3.715 21q-.475 0-.653-.44-.178-.439.154-.77L19.79 3.215q.333-.332.772-.154.44.178.439.653v16.573a.69.69 0 0 1-.712.712z" />
  </svg>
);
SvgRightTriangleFilled.displayName = 'SvgRightTriangleFilled';
const RightTriangleFilledIcon = (props: TIconProps) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgRightTriangleFilled
        {...props}
        className={createClass(getIconStyles(props))}
      />
    )}
  </ClassNames>
);
RightTriangleFilledIcon.displayName = 'RightTriangleFilledIcon';
export default RightTriangleFilledIcon;
