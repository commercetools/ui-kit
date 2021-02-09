import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, withKnobs, number } from '@storybook/addon-knobs/react';
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
        render={(pageSize, onPageSizeChange) => (
          <Value
            defaultValue={number('page', 1)}
            render={(currentPage, onPageChange) => (
              <Pagination
                pageSize={pageSize}
                totalItems={number('totalItems', 200)}
                currentPage={currentPage}
                onPageSizeChange={onPageSizeChange}
                onPageChange={onPageChange}
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
          pageSize={getMinimumPageSizeFromRange(range)}
          pageSizeRange={range}
          currentPageItems={1}
          onPageSizeChange={() => {}}
        />
      </Section>
    );
  })
  .add('PageNavigator', () => (
    <Section>
      <Value
        defaultValue={number('page', 1)}
        render={(currentPage, onPageChange) => (
          <PageNavigator
            totalPages={10}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        )}
      />
    </Section>
  ));
