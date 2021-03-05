import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select } from '@storybook/addon-knobs/react';
import Constraints from '@commercetools-uikit/constraints';
import Section from '../../../../docs/.storybook/decorators/section';
import Readme from '../README.md';
import Card from './card';

storiesOf('Components|Cards', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('Card', () => (
    <Section>
      <Constraints.Horizontal constraint="m">
        <Card
          type={select(
            'type',
            {
              raised: 'raised',
              flat: 'flat',
            },
            'raised'
          )}
          theme={select('theme', {
            light: 'light',
            dark: 'dark',
          })}
          insetSpace={select('insetSpace', {
            m: 'm',
            s: 's',
          })}
        >
          {text('children', 'Card text')}
        </Card>
      </Constraints.Horizontal>
    </Section>
  ));
