// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/lock.react.svg
import { ClassNames } from '@emotion/react';
import {
  getIconStyles,
  type TIconProps,
  type TSVGProps,
} from '@commercetools-uikit/design-system';
const SvgLock = (props: TSVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <path d="M6.714 21a1.65 1.65 0 0 1-1.21-.503A1.65 1.65 0 0 1 5 19.286v-8.572q0-.707.504-1.21A1.65 1.65 0 0 1 6.714 9h.857V7.286q0-1.779 1.254-3.033Q10.078 3 11.857 3t3.033 1.253 1.253 3.033V9H17q.707 0 1.211.503.503.504.503 1.211v8.572q0 .707-.503 1.21Q17.707 21 17 21zm0-1.714H17v-8.572H6.714zm5.143-2.572q.707 0 1.211-.503.504-.504.503-1.211 0-.707-.503-1.211a1.65 1.65 0 0 0-1.21-.503 1.65 1.65 0 0 0-1.211.503q-.504.504-.504 1.211t.504 1.211a1.65 1.65 0 0 0 1.21.503M9.286 9h5.143V7.286a2.48 2.48 0 0 0-.75-1.822 2.48 2.48 0 0 0-1.822-.75 2.48 2.48 0 0 0-1.821.75q-.75.75-.75 1.822zM6.714 19.286v-8.572z" />
  </svg>
);
SvgLock.displayName = 'SvgLock';
const LockIcon = (props: TIconProps) => (
  /* #__PURE__ */ <ClassNames>
    {({ css: createClass }) => (
      <SvgLock {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
LockIcon.displayName = 'LockIcon';
export default LockIcon;
