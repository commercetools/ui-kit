import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Constraints from '@commercetools-frontend/ui-kit/materials/constraints';
import Table from '@commercetools-frontend/ui-kit/table';
import IconButton from '@commercetools-frontend/ui-kit/buttons/icon-button';
import {
  InformationIcon,
  WarningIcon,
} from '@commercetools-frontend/ui-kit/icons';
import FlatButton from '@commercetools-frontend/ui-kit/buttons/flat-button';
import Section from '../../.storybook/decorators/section';
import Readme from './README.md';
import FieldLabel from './field-label';

storiesOf('Fields/FieldLabel', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('basic example', () => (
    <Section>
      <Constraints.Horizontal constraint="m">
        <FieldLabel
          title={text('title', 'Label title')}
          isBold={boolean('isBold', true)}
          subtitle={text('subtitle', '')}
          hint={text('hint', '')}
          isRequired={boolean('isRequired', false)}
          tone={select('tone', [
            '',
            'primary',
            'information',
            'secondary',
            'positive',
            'negative',
            'inverted',
          ])}
          titleIcon={
            select('titleIcon', ['', 'IconButton'], '') ? (
              <IconButton label="label icon" icon={<InformationIcon />} />
            ) : null
          }
          subtitleIcon={
            select('subtitleIcon', ['', 'WarningIcon'], '') ? (
              <WarningIcon />
            ) : null
          }
          badge={
            select('badge', ['', 'FlatButton'], '') ? (
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
  ))
  .add('in table', () => (
    <Section>
      <Table
        columns={[
          {
            key: 'name',
            label: (
              <FieldLabel
                title={text('title', 'Table title')}
                tone={select('tone', ['', 'inverted'], 'inverted')}
                isRequired={boolean('isRequired', false)}
              />
            ),
          },
        ]}
        rowCount={0}
        itemRenderer={() => {}}
        onRowClick={() => {}}
        items={[]}
      />
    </Section>
  ));
