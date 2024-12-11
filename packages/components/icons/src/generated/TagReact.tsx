// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/tag.react.svg
import { ClassNames } from '@emotion/react';
import {
  getIconStyles,
  type TIconProps,
  type TSVGProps,
} from '@commercetools-uikit/design-system';
const SvgTag = (props: TSVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <path d="M14.039 20.482a1.74 1.74 0 0 1-1.284.518q-.766 0-1.284-.518l-7.93-7.93A1.86 1.86 0 0 1 3 11.245V4.802q0-.743.53-1.273A1.74 1.74 0 0 1 4.802 3h6.443q.384 0 .721.146.338.147.586.395l7.93 7.952q.518.518.518 1.272 0 .755-.518 1.274zm-1.284-1.262 6.443-6.443-7.953-7.975H4.802v6.443zm-5.7-10.813q.564 0 .957-.395.395-.393.395-.957 0-.562-.395-.957a1.3 1.3 0 0 0-.957-.395q-.562 0-.957.395a1.3 1.3 0 0 0-.395.957q0 .564.395.957.394.395.957.395" />
  </svg>
);
SvgTag.displayName = 'SvgTag';
const TagIcon = (props: TIconProps) => (
  /* #__PURE__ */ <ClassNames>
    {({ css: createClass }) => (
      <SvgTag {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
TagIcon.displayName = 'TagIcon';
export default TagIcon;
