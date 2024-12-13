// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/truck.react.svg
import { ClassNames } from '@emotion/react';
import {
  getIconStyles,
  type TIconProps,
  type TSVGProps,
} from '@commercetools-uikit/design-system';
const SvgTruck = (props: TSVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <path d="M7.09 18.09a2.37 2.37 0 0 1-1.738-.715 2.37 2.37 0 0 1-.716-1.739q-.675 0-1.155-.48A1.58 1.58 0 0 1 3 14V6.636q0-.675.481-1.155.48-.48 1.155-.481h9.819q.675 0 1.156.481.48.48.48 1.155v1.637h2.045q.206 0 .369.082.163.081.286.245l2.045 2.72a.7.7 0 0 1 .123.226q.04.122.041.265v3.007a.8.8 0 0 1-.236.583.8.8 0 0 1-.582.235h-.818q0 1.023-.716 1.739a2.37 2.37 0 0 1-1.739.716 2.37 2.37 0 0 1-1.738-.716 2.37 2.37 0 0 1-.716-1.739h-4.91q0 1.023-.715 1.739a2.37 2.37 0 0 1-1.74.716m0-1.636a.8.8 0 0 0 .584-.235.8.8 0 0 0 .235-.583.8.8 0 0 0-.235-.582.8.8 0 0 0-.583-.236.8.8 0 0 0-.583.236.8.8 0 0 0-.235.582.8.8 0 0 0 .235.583.8.8 0 0 0 .583.235M4.637 6.637V14h.655a2.8 2.8 0 0 1 .798-.593q.45-.225 1.002-.225t1.002.225.798.593h5.563V6.636zm12.273 9.819a.8.8 0 0 0 .583-.236.8.8 0 0 0 .235-.583.8.8 0 0 0-.235-.582.8.8 0 0 0-.583-.236.8.8 0 0 0-.582.236.8.8 0 0 0-.236.582.8.8 0 0 0 .235.583.8.8 0 0 0 .583.235m-.818-4.091h3.477l-1.84-2.455H16.09z" />
  </svg>
);
SvgTruck.displayName = 'SvgTruck';
const TruckIcon = (props: TIconProps) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgTruck {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
TruckIcon.displayName = 'TruckIcon';
export default TruckIcon;
