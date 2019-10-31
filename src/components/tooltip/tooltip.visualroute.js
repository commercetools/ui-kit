import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { PrimaryButton, Tooltip } from 'ui-kit';
import { Suite, Spec } from '../../../test/percy';

const title = 'What kind of bear is best';
const noop = () => {};

const Body = styled.div`
  color: red;
  margin-top: 12px;
`;

export const routePath = '/tooltip';

export const component = () => (
  <Suite>
    <Spec label="Closed" listPropsOfChild={true}>
      <Tooltip title={title}>
        <PrimaryButton onClick={noop} label="Hello" />
      </Tooltip>
    </Spec>
    <Spec label="Open" listPropsOfChild={true}>
      <div
        css={css`
          margin-top: 50px;
        `}
      />
      <Tooltip title={title} isOpen={true}>
        <PrimaryButton onClick={noop} label="Hello" />
      </Tooltip>
    </Spec>
    <Spec label="Open with custom body component" listPropsOfChild={true}>
      <div
        css={css`
          margin-top: 50px;
        `}
      />
      <Tooltip title={title} isOpen={true} components={{ BodyComponent: Body }}>
        <PrimaryButton onClick={noop} label="Hello" />
      </Tooltip>
    </Spec>
  </Suite>
);
