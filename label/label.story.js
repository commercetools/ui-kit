import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Constraints from '../materials/constraints';
import Table from '../table';
import Section from '../.storybook/decorators/section';
import Readme from './README.md';
import Label from './label';

storiesOf('Fields/FieldLabel', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('basic example', () => (
    <Section>
      <Constraints.Horizontal constraint="m">
        <Label
          value={text('title', 'Label title')}
          isBold={boolean('isBold', true)}
          isRequired={boolean('isRequired', false)}
          tone={select('tone', ['', 'inverted'])}
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
              <Label
                value={text('value', 'Table label')}
                tone={select('tone', ['inverted'], 'inverted')}
                isRequired={boolean('isRequired', true)}
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
