/* eslint-disable react/prop-types */

import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/react';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import Section from '../../../../docs/.storybook/decorators/section';
import Readme from '../README.md';
import Card from './card';
import { BrowserRouter as Router } from 'react-router-dom';

const themes = ['light', 'dark'];
const insetScaleValues = ['none', 's', 'm', 'l', 'xl'];
const content =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.';

const CardStoryTemplate = (props) => {
  const onClickEnabled = boolean('onClick enabled', false);
  const isDisabled = boolean('isDisabled', false);
  const to = text('to', '');
  const isExternal = boolean('isExternal', false);

  const handleClick = onClickEnabled ? () => alert('Card clicked') : undefined;

  return (
    <Router>
      <Section>
        {themes.map((theme) => (
          <Spacings.Stack key={theme}>
            <Text.Headline as="h2">
              <code>theme: {theme}</code>
            </Text.Headline>
            <Spacings.Inline>
              {insetScaleValues.map((scale) => (
                <Spacings.Stack key={scale} scale="s">
                  <Text.Body fontWeight="bold">
                    <code>insetScale: {scale}</code>
                  </Text.Body>
                  <Card
                    insetScale={scale}
                    type={props.type}
                    theme={theme}
                    onClick={handleClick}
                    isDisabled={isDisabled}
                    to={to ? to : undefined}
                    isExternal={isExternal}
                  >
                    {text('content', content)}
                  </Card>
                </Spacings.Stack>
              ))}
            </Spacings.Inline>
          </Spacings.Stack>
        ))}
      </Section>
    </Router>
  );
};

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
