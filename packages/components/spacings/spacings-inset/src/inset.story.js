import { storiesOf } from '@storybook/react';
import styled from '@emotion/styled';
import Text from '../../../text';
import Inline from '../../spacings-inline';
import Inset from './inset';
import Readme from '../README.md';

const View = styled.div`
  display: flex;
`;

const InsetColorWrapper = styled.div`
  background-color: #ff5b5b;
  height: 100px;
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  > * {
    flex-grow: 1;
    display: flex;
    align-items: stretch;
  }
`;

const Square = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  text-align: center;
`;

const sizes = [
  { name: 'xs', pixels: '4px' },
  { name: 's', pixels: '8px' },
  { name: 'm', pixels: '16px' },
  { name: 'l', pixels: '24px' },
  { name: 'xl', pixels: '32px' },
];

storiesOf('Components|Spacings', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('Inset', () => (
    <View>
      <Inset scale="m">
        <Inline scale="s">
          {sizes.map((size) => (
            <InsetColorWrapper key={size.name}>
              <Inset scale={size.name}>
                <Square>
                  <Text.Subheadline as="h4">
                    {size.name.toUpperCase()}
                    <Text.Detail>{size.pixels}</Text.Detail>
                  </Text.Subheadline>
                </Square>
              </Inset>
            </InsetColorWrapper>
          ))}
        </Inline>
      </Inset>
    </View>
  ));
