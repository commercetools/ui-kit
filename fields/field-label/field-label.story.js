import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Constraints from '@commercetools-frontend/ui-kit/materials/constraints';
import IconButton from '@commercetools-frontend/ui-kit/buttons/icon-button';
import {
  InformationIcon,
  WarningIcon,
} from '@commercetools-frontend/ui-kit/icons';
import FlatButton from '@commercetools-frontend/ui-kit/buttons/flat-button';
import Section from '../../.storybook/decorators/section';
import Readme from './README.md';
import FieldLabel from './field-label';

storiesOf('Fields', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('FieldLabel', () => (
    <Section>
      <Constraints.Horizontal constraint="m">
        <FieldLabel
          title={text('title', 'Label title example')}
          hasRequiredIndicator={boolean('hasRequiredIndicator', true)}
          button={
            select('button', ['', 'IconButton'], 'IconButton') ? (
              <IconButton label="label icon" icon={<InformationIcon />} />
            ) : null
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
