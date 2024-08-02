import { ReactNode } from 'react';
import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import { filterDataAttributes } from '@commercetools-uikit/utils';

export type TScale = 'xs' | 's' | 'm' | 'l' | 'xl';

const getPadding = (scale?: TScale) => {
  switch (scale) {
    case 'xs':
      return designTokens.spacing10;
    case 's':
      return designTokens.spacing20;
    case 'm':
      return designTokens.spacing30;
    case 'l':
      return designTokens.spacing40;
    case 'xl':
      return designTokens.spacing50;
    default:
      return 0;
  }
};

export type TInsetProps = {
  /** sets the amount of `padding` applied around the children */
  scale: TScale;
  /** sets the height of the component to 100% of the available width ('expanded') or 'auto' */
  height: 'collapsed' | 'expanded';
  children?: ReactNode;
};

const Inset = (props: TInsetProps) => (
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
const defaultProps: Pick<TInsetProps, 'scale' | 'height'> = {
  scale: 'm',
  height: 'collapsed',
};
Inset.displayName = 'Inset';
Inset.defaultProps = defaultProps;

export default Inset;
