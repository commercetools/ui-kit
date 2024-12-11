// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/arrow-long-down.react.svg
import { ClassNames } from '@emotion/react';
import {
  getIconStyles,
  type TIconProps,
  type TSVGProps,
} from '@commercetools-uikit/design-system';
const SvgArrowLongDown = (props: TSVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <path d="M11.084 17.7V3.97q0-.412.279-.69a.94.94 0 0 1 .69-.279q.411 0 .69.279a.94.94 0 0 1 .278.69V17.7l1.356-1.356a.86.86 0 0 1 .667-.254.99.99 0 0 1 .69.302.92.92 0 0 1 .266.679q0 .411-.266.678l-3.003 2.979q-.146.145-.315.217a.7.7 0 0 1-.364.049q-.194 0-.363-.06a.86.86 0 0 1-.315-.207l-3.003-3.003a.9.9 0 0 1-.278-.69.95.95 0 0 1 .278-.666.94.94 0 0 1 .691-.29q.399 0 .666.266z" />
  </svg>
);
SvgArrowLongDown.displayName = 'SvgArrowLongDown';
const ArrowLongDownIcon = (props: TIconProps) => (
  /* #__PURE__ */ <ClassNames>
    {({ css: createClass }) => (
      <SvgArrowLongDown
        {...props}
        className={createClass(getIconStyles(props))}
      />
    )}
  </ClassNames>
);
ArrowLongDownIcon.displayName = 'ArrowLongDownIcon';
export default ArrowLongDownIcon;
