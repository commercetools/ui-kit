// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/drag-drop.react.svg
import { ClassNames } from '@emotion/react';
import {
  getIconStyles,
  type TIconProps,
  type TSVGProps,
} from '@commercetools-uikit/design-system';
const SvgDragDrop = (props: TSVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <path d="M12.179 21q-.21 0-.394-.066a.9.9 0 0 1-.341-.223l-2.755-2.755a.96.96 0 0 1-.289-.708q0-.42.315-.735a1 1 0 0 1 .735-.289q.446 0 .734.29l.945.944V6.542l-.971.971a.96.96 0 0 1-.708.289q-.42 0-.735-.315a1 1 0 0 1-.289-.735q0-.445.289-.735l2.729-2.728a.9.9 0 0 1 .34-.224A1.2 1.2 0 0 1 12.179 3q.21 0 .394.065a.9.9 0 0 1 .341.224l2.755 2.755a.96.96 0 0 1 .289.708q0 .42-.315.735a1 1 0 0 1-.735.289 1 1 0 0 1-.734-.29l-.945-.944v10.916l.97-.971a.96.96 0 0 1 .71-.289q.42 0 .734.315a1 1 0 0 1 .289.735 1 1 0 0 1-.289.735l-2.729 2.728a.9.9 0 0 1-.341.223 1.2 1.2 0 0 1-.393.066" />
  </svg>
);
SvgDragDrop.displayName = 'SvgDragDrop';
const DragDropIcon = (props: TIconProps) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgDragDrop {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
DragDropIcon.displayName = 'DragDropIcon';
export default DragDropIcon;
