import { storiesOf } from '@storybook/react';
import {
  select,
  withKnobs,
  number,
  boolean,
} from '@storybook/addon-knobs/react';
import { Value } from 'react-value';
import Section from '../../../../docs/.storybook/decorators/section';
import Pagination from './pagination';
import PageNavigator from './page-navigator';
import PageSizeSelector from './page-size-selector';
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
        render={(perPage, onPerPageChange, isSearchable) => (
          <Value
            defaultValue={number('page', 1)}
            render={(page, onPageChange) => (
              <Pagination
                totalItems={number('totalItems', 200)}
                page={page}
                onPageChange={onPageChange}
                perPage={perPage}
                onPerPageChange={onPerPageChange}
                isSearchable={boolean('isSearchable', false)}
              />
            )}
          />
        )}
      />
    </Section>
  ))
  .add('PageSizeSelector', () => {
    const range = select('range', ['s', 'm', 'l'], 's');
    const getMinimumPageSizeFromRange = (selectedRange) => {
      switch (selectedRange) {
        case 'l':
          return 200;
        default:
          return 20;
      }
    };
    return (
      <Section>
        <PageSizeSelector
          pageItems={1}
          perPage={getMinimumPageSizeFromRange(range)}
          perPageRange={range}
          onPerPageChange={() => {}}
        />
      </Section>
    );
  })
  .add('PageNavigator', () => (
    <Section>
      <Value
        defaultValue={1}
        render={(page, onPageChange) => (
          <PageNavigator
            totalPages={10}
            page={page}
            onPageChange={onPageChange}
          />
        )}
      />
    </Section>
  ));
