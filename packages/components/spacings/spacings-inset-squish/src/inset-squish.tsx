import { ReactNode } from 'react';
import { css } from '@emotion/react';
import { customProperties } from '@commercetools-uikit/design-system';
import { filterDataAttributes } from '@commercetools-uikit/utils';

type TScale = 's' | 'm' | 'l';
type TProps = {
  scale: TScale;
  children: ReactNode;
};

const getPadding = (scale?: TScale) => {
  switch (scale) {
    case 's':
      return `${customProperties.spacingXs} ${customProperties.spacingS}`;
    case 'm':
      return `${customProperties.spacingS} ${customProperties.spacingM}`;
    case 'l':
      return `${customProperties.spacingM} ${customProperties.spacingXl}`;
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
