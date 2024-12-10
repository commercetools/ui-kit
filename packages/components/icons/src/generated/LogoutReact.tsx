// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/logout.react.svg
import { ClassNames } from '@emotion/react';
import {
  getIconStyles,
  type TIconProps,
  type TSVGProps,
} from '@commercetools-uikit/design-system';
const SvgLogout = (props: TSVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <path d="M15.325 16.275a1.1 1.1 0 0 1-.275-.738q0-.412.275-.687l1.85-1.85H10a.97.97 0 0 1-.712-.288A.97.97 0 0 1 9 12q0-.425.288-.713A.97.97 0 0 1 10 11h7.175l-1.85-1.85q-.3-.3-.3-.712 0-.413.3-.713.275-.3.688-.3t.687.275l3.6 3.6q.15.15.213.325.062.175.062.375t-.062.375a.9.9 0 0 1-.213.325l-3.6 3.6q-.325.325-.712.287a1.05 1.05 0 0 1-.663-.312M5 21q-.825 0-1.413-.587A1.93 1.93 0 0 1 3 19V5q0-.825.587-1.413A1.93 1.93 0 0 1 5 3h6a.97.97 0 0 1 .713.287A.97.97 0 0 1 12 4q0 .424-.287.712A.97.97 0 0 1 11 5H5v14h6q.425 0 .713.288A.97.97 0 0 1 12 20q0 .424-.287.712A.97.97 0 0 1 11 21z" />
  </svg>
);
SvgLogout.displayName = 'SvgLogout';
const LogoutIcon = (props: TIconProps) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgLogout {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
LogoutIcon.displayName = 'LogoutIcon';
export default LogoutIcon;
