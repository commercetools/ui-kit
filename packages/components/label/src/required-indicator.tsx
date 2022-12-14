import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';

const RequiredIndicator = () => (
  <em
    css={css`
      color: ${designTokens.colorWarning};
      font-style: ${designTokens.fontStyleForRequiredIndicator};
    `}
  >
    {'*'}
  </em>
);
RequiredIndicator.displayName = 'RequiredIndicator';

export default RequiredIndicator;
