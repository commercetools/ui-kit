/* eslint-disable react/prop-types */

import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs/react';
import Stack from '../../spacings/spacings-stack';
import Inline from '../../spacings/spacings-inline';
import Text from '../../text';
import Section from '../../../../docs/.storybook/decorators/section';
import Readme from '../README.md';
import Card from './card';

const themes = ['light', 'dark'];
const insetScaleValues = ['none', 's', 'm', 'l', 'xl'];
const content =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.';

const CardStoryTemplate = (props) => (
  <Section>
    {themes.map((theme) => (
      <Stack key={theme}>
        <Text.Headline as="h2">
          <code>theme: {theme}</code>
        </Text.Headline>
        <Inline>
          {insetScaleValues.map((scale) => (
            <Stack key={scale} scale="s">
              <Text.Body isBold>
                <code>insetScale: {scale}</code>
              </Text.Body>
              <Card insetScale={scale} type={props.type} theme={theme}>
                {text('content', content)}
              </Card>
            </Stack>
          ))}
        </Inline>
      </Stack>
    ))}
  </Section>
);

storiesOf('Components|Cards', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('Raised', () => <CardStoryTemplate type="raised" />)
  .add('Flat', () => <CardStoryTemplate type="flat" />);
