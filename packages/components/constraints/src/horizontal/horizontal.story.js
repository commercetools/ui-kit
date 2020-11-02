import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import styled from '@emotion/styled';
import Horizontal from './horizontal';
import { getAcceptedMaxPropValues } from '../helpers';
import Readme from '../../README.md';

const ColouredRow = styled.div`
  height: 30px;
  display: flex;
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
`;
const Column = styled.div`
  display: inline-block;
  width: ${vars.constraint2};
  margin-right: ${vars.spacingM};
  height: 100%;
  text-align: center;
  background-color: rgba(241, 109, 14, 0.3);
`;

storiesOf('Components|Constraints', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('Horizontal', () => {
    const values = getAcceptedMaxPropValues();

    return (
      <Wrapper>
        <ColumnsContainer>
          {Array.from({ length: 8 }).map((_, index) => (
            <Column key={index}>{`Column ${index + 1}`}</Column>
          ))}
        </ColumnsContainer>
        <Stack>
          {values.map((max) => (
            <Horizontal key={max} max={max}>
              <ColouredRow>{max.toString()}</ColouredRow>
            </Horizontal>
          ))}
        </Stack>
      </Wrapper>
    );
  });
