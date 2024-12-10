// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/flame.react.svg
import { ClassNames } from '@emotion/react';
import {
  getIconStyles,
  type TIconProps,
  type TSVGProps,
} from '@commercetools-uikit/design-system';
const SvgFlame = (props: TSVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <path d="M4 13.613q0 2.42 1.248 4.368a8 8 0 0 0 3.286 2.943 4.9 4.9 0 0 1-.904-1.478 4.7 4.7 0 0 1-.319-1.707q0-.968.357-1.82a4.6 4.6 0 0 1 1.07-1.542l3.413-3.363 3.44 3.363q.687.687 1.044 1.541.356.854.356 1.821a4.7 4.7 0 0 1-.318 1.707 4.9 4.9 0 0 1-.904 1.478 8 8 0 0 0 3.286-2.943q1.248-1.948 1.248-4.368a8.2 8.2 0 0 0-.956-3.872 8.1 8.1 0 0 0-2.636-2.955.52.52 0 0 0-.484-.064q-.255.09-.458.319a2 2 0 0 1-.7.573 1.9 1.9 0 0 1-.854.19 2.02 2.02 0 0 1-1.465-.585 1.95 1.95 0 0 1-.599-1.452V3.933q0-.535-.445-.802-.446-.268-.88.012-3.183 1.962-5.005 4.738Q4 10.658 4 13.613m8.151-.459-2.343 2.293a3 3 0 0 0-.726 1.044q-.242.586-.242 1.248 0 1.35.968 2.306.968.955 2.343.955t2.344-.955a3.12 3.12 0 0 0 .968-2.306q0-.662-.255-1.248a3.4 3.4 0 0 0-.713-1.044z" />
  </svg>
);
SvgFlame.displayName = 'SvgFlame';
const FlameIcon = (props: TIconProps) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgFlame {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
FlameIcon.displayName = 'FlameIcon';
export default FlameIcon;
