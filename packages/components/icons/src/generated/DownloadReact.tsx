// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/download.react.svg
import { ClassNames } from '@emotion/react';
import {
  getIconStyles,
  type TIconProps,
  type TSVGProps,
} from '@commercetools-uikit/design-system';
const SvgDownload = (props: TSVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <path d="M12 16.022q-.224 0-.422-.071a1 1 0 0 1-.365-.239l-4.05-4.05a1.07 1.07 0 0 1-.31-.787q0-.478.31-.787t.8-.324q.493-.014.803.295l2.109 2.11V4.125q0-.478.324-.802Q11.521 3 12 3q.478 0 .802.323.323.324.323.802v8.044l2.11-2.11q.309-.309.802-.295.49.014.8.324.31.309.31.787t-.31.787l-4.05 4.05a1 1 0 0 1-.365.239q-.197.07-.422.07M5.25 21q-.928 0-1.588-.66A2.17 2.17 0 0 1 3 18.75V16.5q0-.478.323-.802.324-.323.802-.323t.802.323q.323.324.323.802v2.25h13.5V16.5q0-.478.324-.802.323-.323.801-.323t.801.323q.324.324.324.802v2.25a2.17 2.17 0 0 1-.66 1.59q-.662.66-1.59.66z" />
  </svg>
);
SvgDownload.displayName = 'SvgDownload';
const DownloadIcon = (props: TIconProps) => (
  /* #__PURE__ */ <ClassNames>
    {({ css: createClass }) => (
      <SvgDownload {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
DownloadIcon.displayName = 'DownloadIcon';
export default DownloadIcon;
