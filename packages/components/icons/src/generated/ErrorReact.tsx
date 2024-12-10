// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/error.react.svg
import { ClassNames } from '@emotion/react';
import {
  getIconStyles,
  type TIconProps,
  type TSVGProps,
} from '@commercetools-uikit/design-system';
const SvgError = (props: TSVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <path d="M12 21a8.8 8.8 0 0 1-3.511-.709 9 9 0 0 1-2.857-1.933 9.2 9.2 0 0 1-1.923-2.868A8.8 8.8 0 0 1 3 11.979q0-1.869.709-3.502a9.1 9.1 0 0 1 1.923-2.846 9.1 9.1 0 0 1 2.857-1.922A8.8 8.8 0 0 1 12 3q1.869 0 3.512.709a9.1 9.1 0 0 1 2.857 1.922 9.1 9.1 0 0 1 1.922 2.846A8.7 8.7 0 0 1 21 11.98a8.8 8.8 0 0 1-.709 3.511 9.2 9.2 0 0 1-1.922 2.868 9 9 0 0 1-2.857 1.933A8.8 8.8 0 0 1 12 21m0-2.277q2.814 0 4.768-1.965 1.956-1.966 1.955-4.78 0-1.052-.31-2.04a6.4 6.4 0 0 0-.936-1.847l-9.365 9.365q.816.645 1.826.955 1.01.312 2.062.312m-5.477-2.857 9.343-9.386a6.5 6.5 0 0 0-1.836-.902q-.977-.3-2.03-.301-2.814 0-4.768 1.943-1.955 1.945-1.955 4.759 0 1.052.31 2.04.313.989.936 1.847" />
  </svg>
);
SvgError.displayName = 'SvgError';
const ErrorIcon = (props: TIconProps) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgError {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
ErrorIcon.displayName = 'ErrorIcon';
export default ErrorIcon;
