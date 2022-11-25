import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Spacings, Text, Constraints } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../test/percy';

export const routePath = '/spacings';

const Stack = styled.div`
  > * + * {
    margin: 8px 0 0;
  }
`;

const Row = styled.div`
  display: block;
`;

const View = styled.div`
  display: flex;
`;

const InlineColorWrapper = styled.div`
  background-color: #e1ffdd;
  display: inline-flex;
  align-items: stretch;
  height: 100px;
`;

const Item = styled.div`
  background-color: ${(props) => props.backgroundColor};
  height: ${(props) =>
    props.alignItems === 'stretch' ? 'auto' : props.height};
  width: 100px;
`;

const Scale = styled.div`
  align-self: center;
  width: 75px;
  text-align: center;
`;

const InsetColorWrapper = styled.div`
  display: inline-block;
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

const InsetSquishColorWrapper = styled.div`
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

const Square = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  text-align: center;
`;

const StackColorWrapper = styled.div`
  background-color: #d4e0ec;
  width: 100px;
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

const insetSizes = [
  { name: 'xs', pixels: '4px' },
  { name: 's', pixels: '8px' },
  { name: 'm', pixels: '16px' },
  { name: 'l', pixels: '24px' },
  { name: 'xl', pixels: '32px' },
];

const insetSquishSizes = [
  { name: 's', pixels: '4px x 8px' },
  { name: 'm', pixels: '8px x 16px' },
  { name: 'l', pixels: '16px x 32px' },
];

const flexProps = ['stretch', 'flex-start', 'flex-end', 'center'];
const exampleHeights = ['50px', '60px', '76px', '40px', '66px'];

const StackExample = ({ alignItems }) => (
  <Spacings.Inline scale="s">
    {sizes.map((size) => (
      <StackColorWrapper key={size.name}>
        <Spacings.Inset scale="m">
          <Text.Subheadline as="h4">
            {size.name.toUpperCase()}
            <Text.Detail>{size.pixels}</Text.Detail>
          </Text.Subheadline>
        </Spacings.Inset>
        <Spacings.Stack scale={size.name} alignItems={alignItems}>
          {exampleHeights.map((height) => (
            <Item
              key={height}
              backgroundColor="#2d68a0"
              height={height}
              alignItems={alignItems}
            />
          ))}
        </Spacings.Stack>
      </StackColorWrapper>
    ))}
  </Spacings.Inline>
);

StackExample.displayName = 'StackExample';
StackExample.propTypes = {
  alignItems: PropTypes.oneOf(flexProps),
};

const InlineExample = ({ alignItems }) => (
  <Stack>
    {sizes.map((size) => (
      <Row key={size.name}>
        <InlineColorWrapper>
          <Scale>
            <Spacings.Inset scale="s" alignItems="center">
              <Text.Subheadline as="h4">
                {size.name.toUpperCase()}
                <Text.Detail>{size.pixels}</Text.Detail>
              </Text.Subheadline>
            </Spacings.Inset>
          </Scale>
          <Spacings.Inline scale={size.name} alignItems={alignItems}>
            {exampleHeights.map((height) => (
              <Item
                key={height}
                backgroundColor="#65ff4f"
                height={height}
                alignItems={alignItems}
              />
            ))}
          </Spacings.Inline>
        </InlineColorWrapper>
      </Row>
    ))}
  </Stack>
);

InlineExample.displayName = 'InlineExample';
InlineExample.propTypes = {
  alignItems: PropTypes.oneOf(flexProps),
};

export const component = () => (
  <Suite>
    {flexProps.map((prop) => (
      <Spec
        key={`inline-${prop}`}
        label={`Inline - when alignItems is ${prop}`}
      >
        <InlineExample alignItems={prop} />
      </Spec>
    ))}
    <Spec label="Inset">
      <View>
        <Spacings.Inline scale="s">
          {insetSizes.map((size) => (
            <InsetColorWrapper key={size.name}>
              <Spacings.Inset scale={size.name}>
                <Square>
                  <Text.Subheadline as="h4">
                    {size.name.toUpperCase()}
                    <Text.Detail>{size.pixels}</Text.Detail>
                  </Text.Subheadline>
                </Square>
              </Spacings.Inset>
            </InsetColorWrapper>
          ))}
        </Spacings.Inline>
      </View>
    </Spec>
    <Spec label="InsetSquish">
      <View>
        <Spacings.Inline scale="s" alignItems="center">
          {insetSquishSizes.map((size) => (
            <InsetSquishColorWrapper key={size.name}>
              <Spacings.InsetSquish scale={size.name}>
                <Button>
                  <Text.Subheadline as="h4">
                    {size.name.toUpperCase()}
                    <Text.Detail>{size.pixels}</Text.Detail>
                  </Text.Subheadline>
                </Button>
              </Spacings.InsetSquish>
            </InsetSquishColorWrapper>
          ))}
        </Spacings.Inline>
      </View>
    </Spec>
    {flexProps.map((prop) => (
      <Spec key={`stack-${prop}`} label={`Stack - when alignItems is ${prop}`}>
        <StackExample alignItems={prop} />
      </Spec>
    ))}
    {[
      'flex-start',
      'flex-end',
      'center',
      'space-between',
      'space-around',
      'space-evenly',
    ].map((prop) => (
      <Spec
        key={`inline-justify-${prop}`}
        label={`Inline - when justifyContent is ${prop}`}
      >
        <View>
          <Constraints.Horizontal constraint="scale">
            <Spacings.Inline
              scale="s"
              alignItems="center"
              justifyContent={prop}
            >
              <div>
                <Text.Body>{'Text on the left'}</Text.Body>
              </div>
              <div>
                <Text.Body>{'Text on the right'}</Text.Body>
              </div>
            </Spacings.Inline>
          </Constraints.Horizontal>
        </View>
      </Spec>
    ))}
  </Suite>
);
