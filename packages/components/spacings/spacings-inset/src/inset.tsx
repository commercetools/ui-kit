import { ReactNode } from 'react';
import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import { filterDataAttributes } from '@commercetools-uikit/utils';

export type TScale = 'xs' | 's' | 'm' | 'l' | 'xl';

const getPadding = (scale?: TScale) => {
  switch (scale) {
    case 'xs':
      return designTokens.spacingXs;
    case 's':
      return designTokens.spacingS;
    case 'm':
      return designTokens.spacingM;
    case 'l':
      return designTokens.spacingL;
    case 'xl':
      return designTokens.spacingXl;
    default:
      return 0;
  }
};

type TProps = {
  scale: TScale;
  children?: ReactNode;
};

const Inset = (props: TProps) => (
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
Inset.displayName = 'Inset';
Inset.defaultProps = defaultProps;

export default Inset;
