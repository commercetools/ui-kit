import React from 'react';
import styled from '@emotion/styled';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import { getAcceptedMaxPropValues, getMaxPropTokenValue } from '../src/helpers';
import Horizontal from '../src/horizontal';

const values = getAcceptedMaxPropValues();

const ColouredRow = styled.div`
  display: flex;
  padding: 2px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: ${vars.borderRadius6};
  color: ${vars.colorSurface};
  background-color: ${vars.colorPrimary};
`;

const Stack = styled.div`
  > * + * {
    margin: 8px 0 0;
  }
`;

const Wrapper = styled.div`
  position: relative;
  padding-top: ${vars.spacingXl};
`;

const ColumnsContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  white-space: nowrap;
`;
const Column = styled.div`
  display: inline-block;
  width: ${vars.constraint2};
  margin-right: ${vars.spacingM};
  height: 100%;
  text-align: center;
  background-color: rgba(241, 109, 14, 0.3);
`;

export default {
  title: 'Components/Constraints/Horizontal',
  component: Horizontal,
};

const Template = () => (
  <Wrapper>
    <ColumnsContainer>
      {Array.from({ length: 8 }).map((_, index) => (
        <Column key={index}>{`Column ${index + 1}`}</Column>
      ))}
    </ColumnsContainer>
    <Stack>
      {values.map((max) => (
        <Horizontal key={max} max={max}>
          <ColouredRow>
            <b>{max.toString()}</b>
            {typeof max === 'number' ? (
              <small>{`${getMaxPropTokenValue(max)}`}</small>
            ) : null}
          </ColouredRow>
        </Horizontal>
      ))}
    </Stack>
  </Wrapper>
);

export const Default = Template.bind({});
Default.args = {};
