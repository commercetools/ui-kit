// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/sparkles.react.svg
import { ClassNames } from '@emotion/react';
import {
  getIconStyles,
  type TIconProps,
  type TSVGProps,
} from '@commercetools-uikit/design-system';
const SvgSparkles = (props: TSVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    aria-hidden="true"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M12.44 12.022a.91.91 0 0 1-.54.54l-7.303 2.703c-.796.294-.796 1.42 0 1.715l7.303 2.703c.25.092.447.29.54.54l2.702 7.302c.295.797 1.421.797 1.716 0l2.702-7.302a.92.92 0 0 1 .54-.54l7.303-2.703c.796-.294.796-1.42 0-1.715L20.1 12.563a.91.91 0 0 1-.54-.54L16.858 4.72c-.295-.796-1.421-.796-1.716 0zM16 8.992l-1.415 3.824a3.2 3.2 0 0 1-1.892 1.891L8.87 16.123l3.824 1.415a3.2 3.2 0 0 1 1.892 1.891L16 23.254l1.415-3.825a3.2 3.2 0 0 1 1.892-1.891l3.825-1.415-3.825-1.416a3.2 3.2 0 0 1-1.892-1.891z"
      clipRule="evenodd"
    />
    <path d="M23.181 4.272a.417.417 0 0 1 .782 0l.95 2.568a.42.42 0 0 0 .247.247l2.568.95a.417.417 0 0 1 0 .782l-2.568.95a.42.42 0 0 0-.247.247l-.95 2.568a.417.417 0 0 1-.782 0l-.95-2.568a.42.42 0 0 0-.247-.247l-2.568-.95a.417.417 0 0 1 0-.782l2.568-.95a.42.42 0 0 0 .247-.247z" />
  </svg>
);
SvgSparkles.displayName = 'SvgSparkles';
const SparklesIcon = (props: TIconProps) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgSparkles {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
SparklesIcon.displayName = 'SparklesIcon';
export default SparklesIcon;
