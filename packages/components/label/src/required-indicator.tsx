import { css } from '@emotion/react';
import { customProperties } from '@commercetools-uikit/design-system';

const RequiredIndicator = () => (
  <em
    css={css`
      color: ${customProperties.colorWarning};
    `}
  >
    {'*'}
  </em>
);
RequiredIndicator.displayName = 'RequiredIndicator';

export default RequiredIndicator;
