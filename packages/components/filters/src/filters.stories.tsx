import Filters, { type TFiltersProps } from './filters';
import type { Meta, StoryFn } from '@storybook/react';
import { designTokens } from '@commercetools-uikit/design-system';

const meta: Meta<typeof Filters> = {
  title: 'components/Filters',
  component: Filters,
  // tags: ['local-dev'],
  argTypes: {},
};

export default meta;

type Story = StoryFn<typeof Filters>;

export const BasicExample: Story = (_props: TFiltersProps) => {
  return (
    <Filters
      renderSearchComponent={() => (
        <div
          css={{
            maxWidth: `${designTokens.constraint13}`,
            border: `1px solid ${designTokens.colorNeutral90}`,
          }}
        >
          SearchPlaceholder
        </div>
      )}
      filters={[]}
      appliedFilters={[]}
      onClearAllRequest={() => {}}
    />
  );
};
