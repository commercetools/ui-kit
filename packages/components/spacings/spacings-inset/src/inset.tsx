import React from 'react';
import { css } from '@emotion/react';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import { filterDataAttributes } from '@commercetools-uikit/utils';

export type TScale = 'xs' | 's' | 'm' | 'l' | 'xl';

const getPadding = (scale?: TScale) => {
  switch (scale) {
    case 'xs':
      return vars.spacingXs;
    case 's':
      return vars.spacingS;
    case 'm':
      return vars.spacingM;
    case 'l':
      return vars.spacingL;
    case 'xl':
      return vars.spacingXl;
    default:
      return 0;
  }
};

type TProps = {
  scale?: TScale;
  children?: React.ReactNode;
};

const Inset: React.FC<TProps> = (props) => (
  <div
    css={css`
      padding: ${getPadding(props.scale)};
    `}
    {...filterDataAttributes(props)}
  >
    {props.children}
  </div>
);

Inset.displayName = 'Inset';
Inset.defaultProps = {
  scale: 'm',
};

export default Inset;
