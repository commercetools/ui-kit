import { warning } from '@commercetools-uikit/utils';
import { type Props as ReactSelectProps } from 'react-select';

const getMessage = (componentName: string) =>
  `${componentName}: use \`menuPortalZIndex\` in conjunction with \`menuPortalTarget\``;

type TWarnIfMenuPortalPropsAreMissingProps = {
  menuPortalZIndex?: number;
  menuPortalTarget?: ReactSelectProps['menuPortalTarget'];
  componentName: string;
};

export const warnIfMenuPortalPropsAreMissing = (
  props: TWarnIfMenuPortalPropsAreMissingProps
): void => {
  if (
    typeof props.menuPortalZIndex !== 'undefined' &&
    props.menuPortalZIndex !== 1 // 1 is the value passed in default props
  ) {
    warning(props.menuPortalTarget, getMessage(props.componentName));
  }
};
