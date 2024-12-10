// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/drag.react.svg
import { ClassNames } from '@emotion/react';
import {
  getIconStyles,
  type TIconProps,
  type TSVGProps,
} from '@commercetools-uikit/design-system';
const SvgDrag = (props: TSVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <path d="M8.25 21q-.928 0-1.588-.66A2.17 2.17 0 0 1 6 18.75q0-.928.662-1.59.66-.66 1.588-.66t1.59.66q.66.662.66 1.59a2.17 2.17 0 0 1-.66 1.59q-.662.66-1.59.66M15 21q-.928 0-1.588-.66a2.17 2.17 0 0 1-.662-1.59q0-.928.662-1.59.66-.66 1.588-.66t1.59.66q.66.662.66 1.59a2.17 2.17 0 0 1-.66 1.59Q15.928 21 15 21m-6.75-6.75q-.928 0-1.588-.662A2.16 2.16 0 0 1 6 12q0-.928.662-1.59.66-.66 1.588-.66t1.59.66q.66.662.66 1.59t-.66 1.588q-.662.662-1.59.662m6.75 0q-.928 0-1.588-.662A2.16 2.16 0 0 1 12.75 12q0-.928.662-1.59.66-.66 1.588-.66t1.59.66q.66.662.66 1.59t-.66 1.588q-.662.662-1.59.662M8.25 7.5q-.928 0-1.588-.662A2.16 2.16 0 0 1 6 5.25q0-.928.662-1.588Q7.322 3 8.25 3t1.59.662q.66.66.66 1.588t-.66 1.588q-.662.662-1.59.662m6.75 0q-.928 0-1.588-.662a2.16 2.16 0 0 1-.662-1.588q0-.928.662-1.588Q14.072 3 15 3t1.59.662q.66.66.66 1.588t-.66 1.588Q15.928 7.5 15 7.5" />
  </svg>
);
SvgDrag.displayName = 'SvgDrag';
const DragIcon = (props: TIconProps) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgDrag {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
DragIcon.displayName = 'DragIcon';
export default DragIcon;
