import React from 'react';
import { css } from '@emotion/core';
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
