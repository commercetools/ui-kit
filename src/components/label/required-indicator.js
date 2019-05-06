import React from 'react';
import { css } from '@emotion/core';
import vars from '../../../materials/custom-properties';

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
