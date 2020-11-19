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

const ContainerWithPadding = styled.div`
  padding-top: 50px;
`;

export const routePath = '/tooltip';

export const component = () => {
  return (
    <Suite>
      <div style={{ position: 'relative' }}>
        <Spec label="Closed">
          <Tooltip title={title}>
            <PrimaryButton onClick={noop} label="Hello" />
          </Tooltip>
        </Spec>
      </div>
      <div style={{ position: 'relative' }}>
        <Spec label="Open" listPropsOfNestedChild={true}>
          <ContainerWithPadding>
            <Tooltip title={title} isOpen={true}>
              <PrimaryButton onClick={noop} label="Hello" />
            </Tooltip>
          </ContainerWithPadding>
        </Spec>
      </div>
      <div style={{ position: 'relative' }}>
        <Spec
          label="Open with custom body component"
          listPropsOfNestedChild={true}
        >
          <ContainerWithPadding>
            <Tooltip
              title={title}
              isOpen={true}
              components={{ BodyComponent: Body }}
            >
              <PrimaryButton onClick={noop} label="Hello" />
            </Tooltip>
          </ContainerWithPadding>
        </Spec>
      </div>
    </Suite>
  );
};
/*
 */
