import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../.storybook/decorators/section';
import Spacings from '../../materials/spacings';
import Readme from './README.md';
import FieldLabel from './field-label';

storiesOf('Fields', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('FieldLabel', () => (
    <Section>
      <Spacings.Stack scale="m">
        <FieldLabel
          title={text('Title of label with subtitle', 'Label with subtitle')}
          subtitle={'Subtitle of label'}
          isRequired={boolean('isFieldRequired', true)}
        />
        <FieldLabel
          title={text(
            'Title of label without subtitle',
            'Label without subtitle'
          )}
          isRequired={boolean('isFieldRequired', true)}
        />
      </Spacings.Stack>
    </Section>
  ));
