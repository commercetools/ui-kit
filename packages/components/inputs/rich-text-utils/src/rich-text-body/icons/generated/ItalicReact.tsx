// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/rich-text-body/icons/svg/italic.react.svg
import { ClassNames } from '@emotion/react';
import {
  getIconStyles,
  type TIconProps,
  type TSVGProps,
} from '@commercetools-uikit/design-system';
const SvgItalic = (props: TSVGProps) => (
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
      d="M9 20.99 12.827 3h2.067l-3.827 17.99z"
    />
  </svg>
);
SvgItalic.displayName = 'SvgItalic';
const ItalicIcon = (props: TIconProps) => (
  /* #__PURE__ */ <ClassNames>
    {({ css: createClass }) => (
      <SvgItalic {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
ItalicIcon.displayName = 'ItalicIcon';
export default ItalicIcon;
