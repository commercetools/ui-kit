import React from 'react';
import { css } from '@emotion/core';
import { PrimaryButton, Tooltip } from 'ui-kit';
import { Suite, Spec } from '../../../test/percy';

const title = 'What kind of bear is best';
const noop = () => {};

export const routePath = '/tooltip';

export const component = () => (
  <Suite>
    <Spec label="Closed" omitPropsList>
      <Tooltip title={title} eventsEnabled={false}>
        <PrimaryButton onClick={noop} label="Hello" />
      </Tooltip>
    </Spec>
    <Spec label="Open" omitPropsList>
      <div
        css={css`
          margin-top: 50px;
        `}
      />
      <Tooltip title={title} isOpen={true} eventsEnabled={false}>
        <PrimaryButton onClick={noop} label="Hello" />
      </Tooltip>
    </Spec>
  </Suite>
);
