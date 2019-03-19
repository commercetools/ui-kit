import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select } from '@storybook/addon-knobs/react';
import withReadme from 'storybook-readme/with-readme';
import LinkTo from '@storybook/addon-links/react';
import styled from '@emotion/styled';
import Section from '../../../.storybook/decorators/section';
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
  padding: 16px;
`;

const gridGroupId = 'grid';
const gridItemGroupId = 'grid-item';

const renderGridElements = () => {
  const elems = select('Num. of grid elements', createList(20), 6, gridGroupId);
  return createList(elems).map((el, index) => (
    <Grid.Item
      key={index}
      gridColumnStart={text('gridColumnStart', '', gridItemGroupId)}
      gridColumnEnd={text('gridColumnEnd', '', gridItemGroupId)}
      gridRowStart={text('gridRowStart', '', gridItemGroupId)}
      gridRowEnd={text('gridRowEnd', '', gridItemGroupId)}
      gridColumn={text('gridColumn', '', gridItemGroupId)}
      gridRow={text('gridRow', '', gridItemGroupId)}
      gridArea={text('gridArea', '', gridItemGroupId)}
      justifySelf={select(
        'justifySelf',
        [null, 'start', 'end', 'center', 'stretch'],
        null,
        gridItemGroupId
      )}
      alignSelf={select(
        'alignSelf',
        [null, 'start', 'end', 'center', 'stretch'],
        null,
        gridItemGroupId
      )}
      placeSelf={select(
        'placeSelf',
        [null, 'start', 'end', 'center', 'stretch'],
        null,
        gridItemGroupId
      )}
    >
      <Placeholder>{el}</Placeholder>
    </Grid.Item>
  ));
};

storiesOf('Components|Grid', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('Grid', () => (
    <React.Fragment>
      <Section>
        <Spacings.Stack scale="m">
          <Spacings.Stack scale="s">
            <Text.Body isItalic={true} tone="secondary">
              <a
                href="https://css-tricks.com/snippets/css/complete-guide-grid"
                target="_blank"
              >
                {'CSS Grid Layout'}
              </a>
              {
                ' is the most powerful layout system available in CSS. It is a 2-dimensional system, meaning it can handle both columns and rows, unlike flexbox which is largely a 1-dimensional system. You work with Grid Layout by applying CSS rules both to a parent element (which becomes the Grid Container) and to that elements children (which become Grid Items).'
              }
            </Text.Body>
            <Text.Headline elementType="h3">{'Getting started'}</Text.Headline>
            <Text.Body>
              {
                'In the Knobs section on the right panel, you can see all the supported CSS Grid properties, both for the parent container and for the children elements (items).'
              }
            </Text.Body>
            <LinkTo kind="Examples|Components/Grid" story="Grid layouts">
              <Text.Body tone="primary">
                {
                  'Check out the Grid examples to build some basic grid layouts!'
                }
              </Text.Body>
            </LinkTo>
          </Spacings.Stack>
          <Grid
            display={select(
              'display',
              ['grid', 'inline-grid'],
              'grid',
              gridGroupId
            )}
            gridTemplateColumns={text('gridTemplateColumns', '', gridGroupId)}
            gridTemplateRows={text('gridTemplateRows', '', gridGroupId)}
            gridTemplateAreas={text('gridTemplateAreas', '', gridGroupId)}
            gridTemplate={text('gridTemplate', '', gridGroupId)}
            gridColumnGap={text('gridColumnGap', '', gridGroupId)}
            gridRowGap={text('gridRowGap', '', gridGroupId)}
            gridGap={text('gridGap', '', gridGroupId)}
            justifyItems={select(
              'justifyItems',
              ['start', 'end', 'center', 'stretch', null],
              null,
              gridGroupId
            )}
            alignItems={select(
              'alignItems',
              ['start', 'end', 'center', 'stretch', null],
              null,
              gridGroupId
            )}
            placeItems={select(
              'placeItems',
              ['start', 'end', 'center', 'stretch', null],
              null,
              gridGroupId
            )}
            justifyContent={select(
              'justifyContent',
              [
                'start',
                'end',
                'center',
                'stretch',
                'space-around',
                'space-between',
                'space-evenly',
                null,
              ],
              null,
              gridGroupId
            )}
            alignContent={select(
              'alignContent',
              [
                'start',
                'end',
                'center',
                'stretch',
                'space-around',
                'space-between',
                'space-evenly',
                null,
              ],
              null,
              gridGroupId
            )}
            placeContent={select(
              'placeContent',
              [
                'start',
                'end',
                'center',
                'stretch',
                'space-around',
                'space-between',
                'space-evenly',
                null,
              ],
              null,
              gridGroupId
            )}
            gridAutoColumns={text('gridAutoColumns', '', gridGroupId)}
            gridAutoRows={text('gridAutoRows', '', gridGroupId)}
            gridAutoFlow={text('gridAutoFlow', '', gridGroupId)}
            grid={text('gridAutoFlow', '', gridGroupId)}
          >
            {renderGridElements()}
          </Grid>
        </Spacings.Stack>
      </Section>
    </React.Fragment>
  ));
