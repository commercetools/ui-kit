import React from 'react';
import TextInput from '@commercetools-frontend/ui-kit/inputs/text-input';
import IconButton from '@commercetools-frontend/ui-kit/buttons/icon-button';
import { InformationIcon } from '@commercetools-frontend/ui-kit/icons';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
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
      <Spacings.Stack>
        <FieldLabel
          title={text('title', 'Label title')}
          subtitle={text('subtitle', null)}
          isRequired={boolean('isRequired', false)}
          titleIcon={
            select('titleIcon', ['', 'IconButton'], '') ? (
              <IconButton icon={<InformationIcon />} />
            ) : null
          }
        />
        <TextInput placeholder="Placeholder" horizontalConstraint="m" />
      </Spacings.Stack>
    </Section>
  ));
