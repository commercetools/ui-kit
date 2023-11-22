import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';
import styled from '@emotion/styled';
import Text from '@commercetools-uikit/text';
import Inline from '../../spacings-inline';
import Inset from '../../spacings-inset';
import Stack from './stack';
import Readme from '../README.md';

const StackColorWrapper = styled.div`
  background-color: #d4e0ec;
  width: 100px;
  text-align: center;
`;

const StackItem = styled.div`
  background-color: #2d68a0;
  height: 100px;
  width: ${(props) =>
    props.alignItems === 'stretch'
      ? 'auto'
      : `${Math.round(Math.random() * 50) + 50}px`};
`;

const sizes = [
  { name: 'xs', pixels: '4px' },
  { name: 's', pixels: '8px' },
  { name: 'm', pixels: '16px' },
  { name: 'l', pixels: '24px' },
  { name: 'xl', pixels: '32px' },
  { name: 'xxl', pixels: '48px' },
  { name: 'xxxl', pixels: '64px' },
];

storiesOf('Components|Spacings', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('Stack', () => {
    const alignItems = select(
      'Align items',
      ['flex-start', 'center', 'flex-end', 'stretch'],
      'stretch'
    );
    return (
      <Inline scale="s">
        {sizes.map((size) => (
          <StackColorWrapper key={size.name}>
            <Inset scale="m">
              <Text.Subheadline as="h4">
                {size.name.toUpperCase()}
                <Text.Detail>{size.pixels}</Text.Detail>
              </Text.Subheadline>
            </Inset>
            <Stack scale={size.name} alignItems={alignItems}>
              <StackItem alignItems={alignItems} />
              <StackItem alignItems={alignItems} />
              <StackItem alignItems={alignItems} />
              <StackItem alignItems={alignItems} />
              <StackItem alignItems={alignItems} />
            </Stack>
          </StackColorWrapper>
        ))}
      </Inline>
    );
  });
