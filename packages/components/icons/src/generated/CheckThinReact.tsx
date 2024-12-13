// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/check-thin.react.svg
import { ClassNames } from '@emotion/react';
import {
  getIconStyles,
  type TIconProps,
  type TSVGProps,
} from '@commercetools-uikit/design-system';
const SvgCheckThin = (props: TSVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <path d="M9.167 18.155q-.223 0-.418-.084a1.2 1.2 0 0 1-.363-.251l-5.051-5.051a1.1 1.1 0 0 1-.335-.81q0-.474.335-.809.334-.335.795-.335.46 0 .796.335l4.241 4.242 9.935-9.907a1 1 0 0 1 .768-.335q.46 0 .795.335t.335.81q0 .473-.335.78L9.95 17.82a1.2 1.2 0 0 1-.363.251q-.195.084-.419.084" />
  </svg>
);
SvgCheckThin.displayName = 'SvgCheckThin';
const CheckThinIcon = (props: TIconProps) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgCheckThin {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
CheckThinIcon.displayName = 'CheckThinIcon';
export default CheckThinIcon;
