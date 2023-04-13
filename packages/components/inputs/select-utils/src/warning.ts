import { warning } from '@commercetools-uikit/utils';
import { type Props as ReactSelectProps } from 'react-select';

const getMessage = (componentName: string) =>
  `${componentName}: use \`menuPortalZIndex\` in conjunction with \`menuPortalTarget\``;

type TWarnAgainstMisuseOfMenuPortalProps = {
  menuPortalZIndex?: number;
  menuPortalTarget?: ReactSelectProps['menuPortalTarget'];
  componentName: string;
};

export const warnAgainstMisuseOfMenuPortalProps = (
  props: TWarnAgainstMisuseOfMenuPortalProps
): void => {
  if (
    typeof props.menuPortalZIndex !== 'undefined' &&
    props.menuPortalZIndex !== 1 // 1 is the value passed in default props
  ) {
    warning(props.menuPortalTarget, getMessage(props.componentName));
  }
};
