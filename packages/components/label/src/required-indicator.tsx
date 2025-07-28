import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';

const RequiredIndicator = () => (
  <em
    css={css`
      color: ${designTokens.colorWarning40};
      font-style: normal;
      margin-left: 2px;
    `}
  >
    {'*'}
  </em>
);
RequiredIndicator.displayName = 'RequiredIndicator';

export default RequiredIndicator;
