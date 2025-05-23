// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/ct-checkout.react.svg
import { ClassNames } from '@emotion/react';
import {
  getIconStyles,
  type TIconProps,
  type TSVGProps,
} from '@commercetools-uikit/design-system';
const SvgCtCheckout = (props: TSVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <path
      fill="#1A1A1A"
      fillRule="evenodd"
      d="M12.337 4.5a2.5 2.5 0 0 0-2.5 2.5v1h-1.5V7c0-2.21 1.79-4 4-4s4 1.79 4 4v1h-1.5V7a2.5 2.5 0 0 0-2.5-2.5m7.62 14.17L18.347 9H6.337l-1.61 9.67c-.2 1.22.74 2.33 1.97 2.33h11.28c1.24 0 2.18-1.11 1.97-2.33zm-1.59.65c-.06.07-.18.18-.38.18H6.707c-.2 0-.33-.11-.38-.18a.5.5 0 0 1-.11-.41l1.4-8.42h9.46l1.4 8.42c.03.2-.06.34-.11.41m-7.09-6.79 1.72 1.72h-4.19v1.5h4.19l-1.72 1.72 1.06 1.06 3.54-3.53-3.54-3.53z"
      clipRule="evenodd"
    />
  </svg>
);
SvgCtCheckout.displayName = 'SvgCtCheckout';
const CtCheckoutIcon = (props: TIconProps) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgCtCheckout {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
CtCheckoutIcon.displayName = 'CtCheckoutIcon';
export default CtCheckoutIcon;
