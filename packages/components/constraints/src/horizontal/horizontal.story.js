import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs/react';
import styled from '@emotion/styled';
import Horizontal from './horizontal';
import Readme from '../../README.md';

const Stack = styled.div`
  > * + * {
    margin: 8px 0 0;
  }
`;

const Row = styled.div`
  display: block;
`;

const InlineColorWrapper = styled.div`
  background-color: #e1ffdd;
  display: inline-flex;
  align-items: stretch;
  height: 100px;
  width: ${props => props.width};
`;

const sizes = [
  { name: 'xs', width: '10%' },
  { name: 's', width: '20%' },
  { name: 'm', width: '30%' },
  { name: 'l', width: '70%' },
  { name: 'xl', width: '100%' },
];

storiesOf('Components|Constraints', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('Horizontal', () => {
    const constraint = select(
      'constraint',
      ['xs', 's', 'm', 'l', 'xl', 'scale'],
      'scale'
    );
    return (
      <Horizontal constraint={constraint}>
        <Stack>
          {sizes.map(size => (
            <Row key={size.name}>
              <InlineColorWrapper width={size.width} />
            </Row>
          ))}
        </Stack>
      </Horizontal>
    );
  });
