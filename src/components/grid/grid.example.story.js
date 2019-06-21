import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, number } from '@storybook/addon-knobs/react';
import styled from '@emotion/styled';
import Section from '../../../.storybook/decorators/section';
import customProperties from '../../../materials/custom-properties';
import Spacings from '../spacings';
import Text from '../typography/text';
import Readme from './README.md';
import Grid from './grid';

const createList = size =>
  Array.from({ length: size }).map((_, index) => index + 1);

const Placeholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: pink;
  padding: ${customProperties.spacingM};
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
      <Spacings.Stack scale="l">
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
      </Spacings.Stack>
    </Section>
  ))
  .add('With auto-sizing columns', () => (
    <Section>
      <Spacings.Stack scale="l">
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
      </Spacings.Stack>
    </Section>
  ));
