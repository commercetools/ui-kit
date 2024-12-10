// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/rich-text-body/icons/svg/expand.react.svg
import { ClassNames } from '@emotion/react';
import {
  getIconStyles,
  type TIconProps,
  type TSVGProps,
} from '@commercetools-uikit/design-system';
const SvgExpand = (props: TSVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <path d="M4 21a.97.97 0 0 1-.712-.288A.97.97 0 0 1 3 20v-6q0-.425.288-.713A.97.97 0 0 1 4 13a.97.97 0 0 1 .713.287A.97.97 0 0 1 5 14v3.6L17.6 5H14a.97.97 0 0 1-.712-.288A.97.97 0 0 1 13 4q0-.425.288-.713A.97.97 0 0 1 14 3h6q.424 0 .712.287Q21 3.575 21 4v6q0 .424-.288.712A.97.97 0 0 1 20 11a.97.97 0 0 1-.712-.288A.97.97 0 0 1 19 10V6.4L6.4 19H10q.425 0 .713.288A.97.97 0 0 1 11 20q0 .424-.287.712A.97.97 0 0 1 10 21z" />
  </svg>
);
SvgExpand.displayName = 'SvgExpand';
const ExpandIcon = (props: TIconProps) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgExpand {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
ExpandIcon.displayName = 'ExpandIcon';
export default ExpandIcon;
