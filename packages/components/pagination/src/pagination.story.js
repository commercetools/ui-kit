import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import { Value } from 'react-value';
import Section from '../../../../.storybook/decorators/section';
import Pagination from './pagination';
import Readme from '../README.md';

storiesOf('Components|Pagination', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add('Pagination', () => (
    <Section>
      <Value
        defaultValue={20}
        render={(pageSize, onPageSizeChange) => (
          <Pagination
            pageSize={pageSize}
            totalItems={number('totalItems', 60)}
            currentPage={number('page', 1)}
            onPageSizeChange={onPageSizeChange}
            onPageChange={(page) => action(`onPageChange: ${page}`)}
          />
        )}
      />
    </Section>
  ));
