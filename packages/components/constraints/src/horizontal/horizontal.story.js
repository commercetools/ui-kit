import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs/react';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import styled from '@emotion/styled';
import Horizontal from './horizontal';
import Readme from '../../README.md';

const ColouredRow = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${vars.borderRadius6};
  color: ${vars.colorSurface};
  background-color: ${vars.colorPrimary};
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
    const max = select(
      'max',
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 'scale', 'auto'],
      'scale'
    );

    return (
      <Horizontal max={max}>
        <ColouredRow>{max.toString()}</ColouredRow>
      </Horizontal>
    );
  });
