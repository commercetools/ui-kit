import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import styled from '@emotion/styled';
import Horizontal from './horizontal';
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

storiesOf('Components|Constraints', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('Horizontal', () => {
    const values = [
      ...Array.from({ length: 16 }).map((_, index) => index + 1),
      'scale',
      'auto',
    ];

    return (
      <Stack>
        {values.map((max) => (
          <Horizontal key={max} max={max}>
            <ColouredRow>{max.toString()}</ColouredRow>
          </Horizontal>
        ))}
      </Stack>
    );
  });
