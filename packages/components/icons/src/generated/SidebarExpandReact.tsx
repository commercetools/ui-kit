// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/sidebar-expand.react.svg
import { ClassNames } from '@emotion/react';
import {
  getIconStyles,
  type TIconProps,
  type TSVGProps,
} from '@commercetools-uikit/design-system';
const SvgSidebarExpand = (props: TSVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <path
      fill="#1A1A1A"
      d="M4.5 21q-.618 0-1.06-.44A1.45 1.45 0 0 1 3 19.5v-15q0-.618.44-1.06Q3.883 3 4.5 3h15q.62 0 1.06.44.44.442.44 1.06v15q0 .62-.44 1.06T19.5 21zm0-1.5h15v-15h-15z"
    />
    <path
      fill="#1A1A1A"
      fillRule="evenodd"
      d="M16.98 12.006a1 1 0 0 0-.04-.292.7.7 0 0 0-.141-.253l-3.058-3.596a.54.54 0 0 0-.454-.203.6.6 0 0 0-.455.223.8.8 0 0 0-.182.544q0 .33.182.544l2.579 3.032-2.595 3.052a.77.77 0 0 0-.174.535q.01.321.19.534a.58.58 0 0 0 .463.214.58.58 0 0 0 .463-.214l3.041-3.576a.7.7 0 0 0 .14-.253 1 1 0 0 0 .042-.292"
      clipRule="evenodd"
    />
    <path
      fill="#1A1A1A"
      d="M3.963 4.768c0-.798.648-1.446 1.446-1.446h4.34c.798 0 1.446.648 1.446 1.446v14.465c0 .799-.648 1.446-1.446 1.446h-4.34a1.446 1.446 0 0 1-1.446-1.446z"
    />
  </svg>
);
SvgSidebarExpand.displayName = 'SvgSidebarExpand';
const SidebarExpandIcon = (props: TIconProps) => (
  /* #__PURE__ */ <ClassNames>
    {({ css: createClass }) => (
      <SvgSidebarExpand
        {...props}
        className={createClass(getIconStyles(props))}
      />
    )}
  </ClassNames>
);
SidebarExpandIcon.displayName = 'SidebarExpandIcon';
export default SidebarExpandIcon;
