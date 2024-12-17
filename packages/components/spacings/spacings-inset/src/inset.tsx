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
  scale?: TScale;
  /** sets the height of the component to 100% of the available width ('expanded') or 'auto' */
  height?: 'collapsed' | 'expanded';
  children?: ReactNode;
};

const Inset = ({
  scale = 'm',
  height = 'collapsed',
  ...props
}: TInsetProps) => (
  <div
    css={css`
      padding: ${getPadding(scale)};
      height: ${height === 'expanded' ? '100%' : 'auto'};
    `}
    {...filterDataAttributes({
      scale,
      height,
      ...props,
    })}
  >
    {props.children}
  </div>
);
Inset.displayName = 'Inset';

export default Inset;
