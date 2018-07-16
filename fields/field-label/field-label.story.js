import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Constraints from '@commercetools-frontend/ui-kit/materials/constraints';
import Table from '@commercetools-frontend/ui-kit/table';
import Checkbox from '@commercetools-frontend/ui-kit/switches/checkbox';
import TextInput from '@commercetools-frontend/ui-kit/inputs/text-input';
import IconButton from '@commercetools-frontend/ui-kit/buttons/icon-button';
import {
  InformationIcon,
  WarningIcon,
} from '@commercetools-frontend/ui-kit/icons';
import FlatButton from '@commercetools-frontend/ui-kit/buttons/flat-button';
import Section from '../../.storybook/decorators/section';
import Spacings from '../../materials/spacings';
import Readme from './README.md';
import FieldLabel from './field-label';

storiesOf('Fields', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('FieldLabel', () => (
    <Section>
      <Spacings.Stack scale="l">
        <Spacings.Stack>
          <Constraints.Horizontal constraint="m">
            <FieldLabel
              title={text('title', 'Label title')}
              isBold={boolean('isBold', true)}
              subtitle={text('subtitle', null)}
              hint={text('hint', null)}
              isRequired={boolean('isRequired', false)}
              titleIcon={
                select('titleIcon', ['', 'IconButton'], '') ? (
                  <IconButton icon={<InformationIcon />} />
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
                  />
                ) : null
              }
            />
          </Constraints.Horizontal>
          <TextInput placeholder="Placeholder" horizontalConstraint="m" />
        </Spacings.Stack>
        <Table
          columns={[
            {
              key: 'name',
              label: (
                <FieldLabel
                  title={text('title-table', 'Table title')}
                  isBold={false}
                  titleTone={select(
                    'titleTone-table',
                    ['', 'inverted'],
                    'inverted'
                  )}
                  isRequired={boolean('isRequired-table', false)}
                />
              ),
            },
          ]}
          rowCount={0}
          itemRenderer={() => {}}
          onRowClick={() => {}}
          items={[]}
        />
        <Checkbox
          isDisabled={false}
          isChecked={false}
          onChange={() => {}}
          value="foo-value"
        >
          <FieldLabel
            title={text('title-checkbox', 'Checkbox title')}
            isBold={false}
            isRequired={boolean('isRequired-checkbox', false)}
          />
        </Checkbox>
        <Spacings.Inline alignItems="center" scale="s">
          <FieldLabel
            title={text('title-left', 'Label title')}
            isBold={boolean('isBold-left', true)}
            isRequired={boolean('isRequired-left', false)}
          />
          <TextInput placeholder="Placeholder" horizontalConstraint="m" />
        </Spacings.Inline>
      </Spacings.Stack>
    </Section>
  ));
