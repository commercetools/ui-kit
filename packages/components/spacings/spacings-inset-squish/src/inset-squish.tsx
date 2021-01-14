import React from 'react';
import { css } from '@emotion/react';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import { filterDataAttributes } from '@commercetools-uikit/utils';

type TScale = 's' | 'm' | 'l';
type TProps = {
  scale?: TScale;
  children: React.ReactNode;
};

const getPadding = (scale?: TScale) => {
  switch (scale) {
    case 's':
      return `${vars.spacingXs} ${vars.spacingS}`;
    case 'm':
      return `${vars.spacingS} ${vars.spacingM}`;
    case 'l':
      return `${vars.spacingM} ${vars.spacingXl}`;
    default:
      return 0;
  }
};

const InsetSquish: React.FC<TProps> = (props) => (
  <div
    css={css`
      padding: ${getPadding(props.scale)};
    `}
    {...filterDataAttributes(props)}
  >
    {props.children}
  </div>
);

InsetSquish.displayName = 'InsetSquish';
InsetSquish.defaultProps = {
  scale: 'm',
};

export default InsetSquish;
