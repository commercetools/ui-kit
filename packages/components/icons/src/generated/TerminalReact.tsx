// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/terminal.react.svg
import { ClassNames } from '@emotion/react';
import {
  getIconStyles,
  type TIconProps,
  type TSVGProps,
} from '@commercetools-uikit/design-system';
const SvgTerminal = (props: TSVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <path d="M12.9 16.7a.87.87 0 0 1-.64-.26.87.87 0 0 1-.26-.64q0-.383.26-.642a.87.87 0 0 1 .64-.258h3.6a.87.87 0 0 1 .64.258q.26.26.26.642a.87.87 0 0 1-.26.64.87.87 0 0 1-.64.26zm-5.58-.63a.85.85 0 0 1-.248-.63q0-.383.248-.63l1.688-1.71-1.71-1.71a.82.82 0 0 1-.259-.63q.01-.36.281-.63a.95.95 0 0 1 .63-.26q.36-.01.63.26l2.34 2.34q.135.136.192.292.056.158.056.338-.001.18-.056.338a.8.8 0 0 1-.192.292l-2.34 2.34a.88.88 0 0 1-.618.258.84.84 0 0 1-.642-.258M4.8 19.4q-.743 0-1.27-.528A1.73 1.73 0 0 1 3 17.6V6.8q0-.743.53-1.27Q4.056 5 4.8 5h14.4q.743 0 1.272.53Q21 6.056 21 6.8v10.8q0 .742-.528 1.272a1.74 1.74 0 0 1-1.272.528zm0-1.8h14.4v-9H4.8z" />
  </svg>
);
SvgTerminal.displayName = 'SvgTerminal';
const TerminalIcon = (props: TIconProps) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgTerminal {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
TerminalIcon.displayName = 'TerminalIcon';
export default TerminalIcon;
