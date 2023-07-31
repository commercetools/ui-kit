import { storiesOf } from '@storybook/react';
import styled from '@emotion/styled';
import Text from '../../../text';
import Inline from '../../spacings-inline';
import Inset from '../../spacings-inset';
import InsetSquish from './inset-squish';
import Readme from '../README.md';

const View = styled.div`
  display: flex;
`;

const InsetColorWrapper = styled.div`
  background-color: #ffb15c;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-radius: 4px;
  > * {
    flex-grow: 1;
    display: flex;
    align-items: stretch;
  }
`;

const Button = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  text-align: center;
`;

const sizes = [
  { name: 's', pixels: '4px x 8px' },
  { name: 'm', pixels: '8px x 16px' },
  { name: 'l', pixels: '16px x 32px' },
];

storiesOf('Components|Spacings', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('Inset Squish', () => (
    <View>
      <Inset scale="m">
        <Inline scale="s" alignItems="center">
          {sizes.map((size) => (
            <InsetColorWrapper key={size.name}>
              <InsetSquish scale={size.name}>
                <Button>
                  <Text.Subheadline as="h4">
                    {size.name.toUpperCase()}
                    <Text.Detail>{size.pixels}</Text.Detail>
                  </Text.Subheadline>
                </Button>
              </InsetSquish>
            </InsetColorWrapper>
          ))}
        </Inline>
      </Inset>
    </View>
  ));
