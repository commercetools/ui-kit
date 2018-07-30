import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Constraints from '../materials/constraints';
import Table from '../table';
import Section from '../.storybook/decorators/section';
import Readme from './README.md';
import Label from './label';

storiesOf('Label', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('basic example', () => (
    <Section>
      <Constraints.Horizontal constraint="m">
        <Label
          isBold={boolean('isBold', true)}
          isRequiredIndicatorVisible={boolean(
            'isRequiredIndicatorVisible',
            false
          )}
          tone={select('tone', ['', 'inverted'])}
          htmlFor={text('htmlFor', 'input-field-id')}
        >
          {text('children', 'Label value')}
        </Label>
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
              >
                {text('children', 'Label value')}
              </Label>
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
