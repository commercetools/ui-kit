// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/arrows-minimize.react.svg
import { ClassNames } from '@emotion/react';
import {
  getIconStyles,
  type TIconProps,
  type TSVGProps,
} from '@commercetools-uikit/design-system';
const SvgArrowsMinimize = (props: TSVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <path d="M10.12 15.196 4.574 20.74a.9.9 0 0 1-.658.259.9.9 0 0 1-.658-.259.9.9 0 0 1-.258-.657q0-.4.258-.658l5.546-5.546H5.42a.9.9 0 0 1-.67-.27.9.9 0 0 1-.27-.67q0-.4.27-.67a.9.9 0 0 1 .67-.27h5.64q.4 0 .67.27t.27.67v5.64a.9.9 0 0 1-.27.67.9.9 0 0 1-.67.27.9.9 0 0 1-.67-.27.9.9 0 0 1-.27-.67zm5.076-5.076h3.384q.4 0 .67.27t.27.67a.9.9 0 0 1-.27.67.9.9 0 0 1-.67.27h-5.64a.9.9 0 0 1-.67-.27.9.9 0 0 1-.27-.67V5.42q0-.4.27-.67a.9.9 0 0 1 .67-.27q.4 0 .67.27t.27.67v3.384l5.546-5.546A.9.9 0 0 1 20.084 3q.399 0 .657.258a.9.9 0 0 1 .259.658.9.9 0 0 1-.259.658z" />
  </svg>
);
SvgArrowsMinimize.displayName = 'SvgArrowsMinimize';
const ArrowsMinimizeIcon = (props: TIconProps) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgArrowsMinimize
        {...props}
        className={createClass(getIconStyles(props))}
      />
    )}
  </ClassNames>
);
ArrowsMinimizeIcon.displayName = 'ArrowsMinimizeIcon';
export default ArrowsMinimizeIcon;
