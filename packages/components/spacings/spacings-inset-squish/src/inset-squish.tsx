import { ReactNode } from 'react';
import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import { filterDataAttributes } from '@commercetools-uikit/utils';

type TScale = 's' | 'm' | 'l';
export type TProps = {
  scale: TScale;
  children: ReactNode;
};

const getPadding = (scale?: TScale) => {
  switch (scale) {
    case 's':
      return `${designTokens.spacing10} ${designTokens.spacing20}`;
    case 'm':
      return `${designTokens.spacing20} ${designTokens.spacing30}`;
    case 'l':
      return `${designTokens.spacing30} ${designTokens.spacing50}`;
    default:
      return 0;
  }
};

const InsetSquish = (props: TProps) => (
  <div
    css={css`
      padding: ${getPadding(props.scale)};
    `}
    {...filterDataAttributes(props)}
  >
    {props.children}
  </div>
);
const defaultProps: Pick<TProps, 'scale'> = {
  scale: 'm',
};
InsetSquish.displayName = 'InsetSquish';
InsetSquish.defaultProps = defaultProps;

export default InsetSquish;
