import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';
import styled from '@emotion/styled';
import Text from '../../../text';
import Inset from '../../spacings-inset';
import Inline from './inline';
import Readme from '../README.md';

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
`;

const InlineItem = styled.div`
  background-color: #65ff4f;
  height: ${(props) =>
    props.alignItems === 'stretch'
      ? 'auto'
      : `${Math.round(Math.random() * 50) + 50}px`};
  width: 100px;
`;

const Scale = styled.div`
  align-self: center;
  width: 75px;
  text-align: center;
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
  .add('Inline', () => {
    const alignItems = select(
      'Align items',
      ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'],
      'stretch'
    );
    const justifyContent = select(
      'Justify content',
      [
        'flex-start',
        'flex-end',
        'center',
        'space-between',
        'space-around',
        'space-evenly',
      ],
      'flex-start'
    );
    return (
      <Stack>
        {sizes.map((size) => (
          <Row key={size.name}>
            <InlineColorWrapper>
              <Scale>
                <Inset scale="s" alignItems="center">
                  <Text.Subheadline as="h4">
                    {size.name.toUpperCase()}
                    <Text.Detail>{size.pixels}</Text.Detail>
                  </Text.Subheadline>
                </Inset>
              </Scale>
              <Inline
                scale={size.name}
                alignItems={alignItems}
                justifyContent={justifyContent}
              >
                <InlineItem alignItems={alignItems} />
                <InlineItem alignItems={alignItems} />
                <InlineItem alignItems={alignItems} />
                <InlineItem alignItems={alignItems} />
                <InlineItem alignItems={alignItems} />
              </Inline>
            </InlineColorWrapper>
          </Row>
        ))}
      </Stack>
    );
  });
