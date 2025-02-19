// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/connected-square.react.svg
import { ClassNames } from '@emotion/react';
import {
  getIconStyles,
  type TIconProps,
  type TSVGProps,
} from '@commercetools-uikit/design-system';
const SvgConnectedSquare = (props: TSVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <path d="M7.8 4.6h6.5c.1 0 .2.2.2.4v1c0 .2-.1.4-.2.4H7.7c-.4.9-1.2 1.5-2.2 1.5C4.1 7.9 3 6.8 3 5.5S4.1 3 5.5 3c1 0 1.9.7 2.3 1.6M4.6 16.3V9.8c0-.1.2-.2.4-.2h1c.2 0 .4.1.4.2v6.5c.9.4 1.4 1.2 1.4 2.2 0 1.4-1.1 2.5-2.5 2.5S3 19.9 3 18.6c0-1.1.7-2 1.6-2.3m11.6 3H9.8c-.1 0-.2-.2-.2-.4v-1c0-.2.1-.4.2-.4h6.5c.4-.9 1.2-1.4 2.2-1.4 1.4 0 2.5 1.1 2.5 2.5S19.9 21 18.5 21c-1 0-1.9-.7-2.3-1.7m3.2-11.5v6.5c0 .1-.2.2-.4.2h-1c-.2 0-.4-.1-.4-.2V7.7c-.9-.4-1.4-1.2-1.4-2.2 0-1.4 1.1-2.5 2.5-2.5S21 4.1 21 5.5c0 1-.7 1.9-1.6 2.3" />
  </svg>
);
SvgConnectedSquare.displayName = 'SvgConnectedSquare';
const ConnectedSquareIcon = (props: TIconProps) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgConnectedSquare
        {...props}
        className={createClass(getIconStyles(props))}
      />
    )}
  </ClassNames>
);
ConnectedSquareIcon.displayName = 'ConnectedSquareIcon';
export default ConnectedSquareIcon;
