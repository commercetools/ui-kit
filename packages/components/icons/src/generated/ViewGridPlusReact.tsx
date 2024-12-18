// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/view-grid-plus.react.svg
import { ClassNames } from '@emotion/react';
import {
  getIconStyles,
  type TIconProps,
  type TSVGProps,
} from '@commercetools-uikit/design-system';
const SvgViewGridPlus = (props: TSVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <path d="M5 11q-.825 0-1.413-.588A1.93 1.93 0 0 1 3 9V5q0-.825.587-1.413A1.93 1.93 0 0 1 5 3h4q.825 0 1.413.587Q11 4.175 11 5v4q0 .825-.587 1.412A1.93 1.93 0 0 1 9 11zm0 10q-.825 0-1.413-.587A1.93 1.93 0 0 1 3 19v-4q0-.825.587-1.413A1.93 1.93 0 0 1 5 13h4q.825 0 1.413.587Q11 14.175 11 15v4q0 .825-.587 1.413A1.93 1.93 0 0 1 9 21zm10-10q-.825 0-1.412-.588A1.92 1.92 0 0 1 13 9V5q0-.825.588-1.413A1.93 1.93 0 0 1 15 3h4q.825 0 1.413.587Q21 4.175 21 5v4q0 .825-.587 1.412A1.93 1.93 0 0 1 19 11zm0 10q-.825 0-1.412-.587A1.93 1.93 0 0 1 13 19v-4q0-.825.588-1.413A1.93 1.93 0 0 1 15 13h4q.825 0 1.413.587Q21 14.175 21 15v4q0 .825-.587 1.413A1.93 1.93 0 0 1 19 21zM5 9h4V5H5zm10 0h4V5h-4zm0 10h4v-4h-4zM5 19h4v-4H5z" />
  </svg>
);
SvgViewGridPlus.displayName = 'SvgViewGridPlus';
const ViewGridPlusIcon = (props: TIconProps) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgViewGridPlus
        {...props}
        className={createClass(getIconStyles(props))}
      />
    )}
  </ClassNames>
);
ViewGridPlusIcon.displayName = 'ViewGridPlusIcon';
export default ViewGridPlusIcon;
