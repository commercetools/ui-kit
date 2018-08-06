import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Constraints from '../materials/constraints';
import { InformationIcon, WarningIcon } from '../icons';
import FlatButton from '../buttons/flat-button';
import Section from '../.storybook/decorators/section';
import Readme from './README.md';
import FieldLabel from './field-label';

storiesOf('FieldLabel', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('FieldLabel', () => (
    <Section>
      <Constraints.Horizontal constraint="m">
        <FieldLabel
          title={text('title', 'Label title example')}
          hasRequiredIndicator={boolean('hasRequiredIndicator', true)}
          onInfoButtonClick={
            boolean('show info button', false)
              ? action('onInfoButtonClick')
              : undefined
          }
          hint={text('hint', 'Hint example')}
          hintIcon={
            select('hintIcon', ['', 'WarningIcon'], 'WarningIcon') ? (
              <WarningIcon />
            ) : null
          }
          description={text('description', '')}
          badge={
            select('badge', ['', 'FlatButton'], 'FlatButton') ? (
              <FlatButton
                tone="primary"
                icon={<InformationIcon />}
                label="show"
                onClick={action('onClick')}
              />
            ) : null
          }
        />
      </Constraints.Horizontal>
    </Section>
  ));
