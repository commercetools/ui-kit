import { ReactNode } from 'react';
import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import { filterDataAttributes } from '@commercetools-uikit/utils';

export type TScale = 's' | 'm' | 'l';
export type TInsetSquishProps = {
  /** sets the amount of `padding` applied around the children */
  scale: TScale;
  /** sets the height of the component to 100% of the available width ('expanded') or 'auto' */
  height: 'collapsed' | 'expanded';
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

const InsetSquish = (props: TInsetSquishProps) => (
  <div
    css={css`
      padding: ${getPadding(props.scale)};
      height: ${props.height === 'expanded' ? '100%' : 'auto'};
    `}
    {...filterDataAttributes(props)}
  >
    {props.children}
  </div>
);
const defaultProps: Pick<TInsetSquishProps, 'scale' | 'height'> = {
  scale: 'm',
  height: 'collapsed',
};
InsetSquish.displayName = 'InsetSquish';
InsetSquish.defaultProps = defaultProps;

export default InsetSquish;
