import { storiesOf } from '@storybook/react';
import { withKnobs, select, number } from '@storybook/addon-knobs/react';
import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';
import Stack from '../../spacings/spacings-stack';
import Text from '../../text';
import Section from '../../../../docs/.storybook/decorators/section';
import Readme from '../README.md';
import Grid from './grid';

const createList = (size) =>
  Array.from({ length: size }).map((_, index) => index + 1);

const Placeholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: pink;
  padding: ${designTokens.spacing30};
`;

const renderGridElements = () => {
  const elems = select('Num. of grid elements', createList(20), 6);
  return createList(elems).map((el, index) => (
    <Grid.Item key={index}>
      <Placeholder>{el}</Placeholder>
    </Grid.Item>
  ));
};

storiesOf('Examples|Components/Grid', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('With fixed columns', () => (
    <Section>
      <Stack scale="l">
        <Text.Body tone="information">
          {'💁 Try resizing the window to see how the grid layout behaves.'}
        </Text.Body>
        <Grid
          gridGap="16px"
          gridAutoColumns="1fr"
          gridTemplateColumns="repeat(3, 1fr)"
        >
          {renderGridElements()}
        </Grid>
      </Stack>
    </Section>
  ))
  .add('With auto-sizing columns', () => (
    <Section>
      <Stack scale="l">
        <Text.Body tone="information">
          {'💁 Try resizing the window to see how the grid layout behaves.'}
        </Text.Body>
        <Grid
          gridGap="16px"
          gridAutoColumns="1fr"
          gridTemplateColumns={`repeat(auto-fill, minmax(${number(
            'min column width',
            150
          )}px, 1fr))`}
        >
          {renderGridElements()}
        </Grid>
      </Stack>
    </Section>
  ));
