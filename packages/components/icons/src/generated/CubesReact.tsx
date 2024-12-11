// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/cubes.react.svg
import { ClassNames } from '@emotion/react';
import {
  getIconStyles,
  type TIconProps,
  type TSVGProps,
} from '@commercetools-uikit/design-system';
const SvgCubes = (props: TSVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="m20.837 12.696-4.265-1.558V6.393a.215.215 0 0 0-.145-.203L12.06 4.594a.22.22 0 0 0-.14 0L7.56 6.146a.2.2 0 0 0-.1.074.22.22 0 0 0-.05.136v4.78l-4.26 1.516a.2.2 0 0 0-.1.074.22.22 0 0 0-.05.137v4.823c0 .09.058.172.144.202l4.362 1.5a.22.22 0 0 0 .141 0l4.344-1.493 4.335 1.493a.22.22 0 0 0 .142 0l4.362-1.502a.214.214 0 0 0 .152-.205V12.9a.21.21 0 0 0-.145-.203m-5.025-1.885-3.352 1.133V8.356l3.352-1.227zM11.99 5.373l3.117 1.162-3.114 1.15-3.29-1.132zm-4.407 8.82-3.29-1.134 3.287-1.18 3.117 1.162zm3.819 3.125L8.05 18.45v-3.588l3.352-1.226zm5.001-3.126-3.29-1.133 3.287-1.18 3.118 1.162zm3.819 3.126L16.87 18.45v-3.588l3.352-1.226z"
    />
  </svg>
);
SvgCubes.displayName = 'SvgCubes';
const CubesIcon = (props: TIconProps) => (
  /* #__PURE__ */ <ClassNames>
    {({ css: createClass }) => (
      <SvgCubes {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
CubesIcon.displayName = 'CubesIcon';
export default CubesIcon;
