import React from 'react';
import styled from '@emotion/styled';
import { PrimaryButton, Tooltip } from '@commercetools-frontend/ui-kit';
import { Switch, Route } from 'react-router-dom';
import { Suite, Spec } from '../../../../test/percy';

const title = 'What kind of bear is best';
const noop = () => {};

// const Body = styled.div`
//   color: red;
//   margin-top: 12px;
// `;

const ContainerWithPadding = styled.div`
  padding-top: 50px;
`;

export const routePath = '/tooltip';

export const DefaultRoute = () => {
  return (
    <Suite>
      <Spec label="Closed">
        <Tooltip title={title}>
          <PrimaryButton onClick={noop} label="Hello" />
        </Tooltip>
      </Spec>
    </Suite>
  );
};

export const InteractiveRoute = () => {
  return (
    <Suite>
      <Spec label="Open" omitPropsList>
        <ContainerWithPadding>
          <Tooltip title={title} closeAfter={5000}>
            <PrimaryButton onClick={noop} label="Hello" />
          </Tooltip>
        </ContainerWithPadding>
      </Spec>
    </Suite>
  );
};

export const component = () => (
  <Switch>
    <Route path={`${routePath}/interactive`} component={InteractiveRoute} />
    <Route path={routePath} component={DefaultRoute} />
  </Switch>
);
