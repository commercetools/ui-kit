import React from 'react';
import styled from '@emotion/styled';
import { PrimaryButton, Tooltip } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../test/percy';

const title = 'What kind of bear is best';
const noop = () => {};

const Body = styled.div`
  color: red;
  margin-top: 12px;
`;

export const routePath = '/tooltip';

export const component = () => {
  return (
    <Suite>
      <Spec label="Closed">
        <Tooltip title={title}>
          <PrimaryButton onClick={noop} label="Hello" />
        </Tooltip>
      </Spec>
      <Spec label="Open" listPropsOfNestedChild={true}>
        <Tooltip title={title} isOpen={true} placement="bottom">
          <PrimaryButton onClick={noop} label="Hello" />
        </Tooltip>
      </Spec>
      <Spec
        label="Open with custom body component"
        listPropsOfNestedChild={true}
      >
        <Tooltip
          title={title}
          isOpen={true}
          components={{ BodyComponent: Body }}
          placement="bottom"
        >
          <PrimaryButton onClick={noop} label="Hello" />
        </Tooltip>
      </Spec>
    </Suite>
  );
};
/*
 */
