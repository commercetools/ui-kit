import { css } from '@emotion/react';
import { customProperties as vars } from '@commercetools-uikit/design-system';

const RequiredIndicator = () => (
  <em
    css={css`
      color: ${vars.colorWarning};
    `}
  >
    {'*'}
  </em>
);
RequiredIndicator.displayName = 'RequiredIndicator';

export default RequiredIndicator;
