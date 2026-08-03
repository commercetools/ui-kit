import type { Meta, StoryObj } from '@storybook/react-vite';
import { VisualSpec } from '@/storybook-helpers';
import { SubheadlineProxy } from './../text.proxies';

const intlMessage = { id: 'Title', defaultMessage: 'Hello' };

const meta: Meta<typeof SubheadlineProxy> = {
  title: 'Text & Media/Text/Text.Subheadline',
  component: SubheadlineProxy,
};
export default meta;

type Story = StoryObj<typeof SubheadlineProxy>;

/** Wraps the given text in the given (via `as`-property) HTML header tag. */
export const BasicExample: Story = {
  args: {
    as: 'h4',
    children: 'Hello Subheadline!',
  },
};

export const AllVariants: StoryObj = {
  tags: ['vrt'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="Subheadline - h4">
        <SubheadlineProxy as="h4">{'Bigger subheadline'}</SubheadlineProxy>
      </VisualSpec>

      <VisualSpec label="Subheadline - h4 - truncated">
        <div style={{ width: 200 }}>
          <SubheadlineProxy as="h4" truncate={true}>
            {'A longer subheadline that should be truncated'}
          </SubheadlineProxy>
        </div>
      </VisualSpec>

      <VisualSpec label="Subheadline - h4 - nowrap">
        <div style={{ width: 200 }}>
          <SubheadlineProxy as="h4" nowrap={true}>
            {'A longer title that should not be new line'}
          </SubheadlineProxy>
        </div>
      </VisualSpec>

      <VisualSpec label="Subheadline - h4 - bold">
        <SubheadlineProxy isBold={true} as="h4">
          {'Bold subheadline'}
        </SubheadlineProxy>
      </VisualSpec>

      <VisualSpec label="Subheadline - tone - primary">
        <SubheadlineProxy tone="primary" as="h4">
          {'Subheadline tone primary'}
        </SubheadlineProxy>
      </VisualSpec>

      <VisualSpec label="Subheadline - tone - secondary">
        <SubheadlineProxy tone="secondary" as="h4">
          {'Subheadline tone secondary'}
        </SubheadlineProxy>
      </VisualSpec>

      <VisualSpec label="Subheadline - tone - tertiary">
        <SubheadlineProxy tone="tertiary" as="h4">
          {'Subheadline tone tertiary'}
        </SubheadlineProxy>
      </VisualSpec>

      <VisualSpec label="Subheadline - tone - information">
        <SubheadlineProxy tone="information" as="h4">
          {'Subheadline tone information'}
        </SubheadlineProxy>
      </VisualSpec>

      <VisualSpec label="Subheadline - tone - positive">
        <SubheadlineProxy tone="positive" as="h4">
          {'Subheadline tone positive'}
        </SubheadlineProxy>
      </VisualSpec>

      <VisualSpec label="Subheadline - tone - negative">
        <SubheadlineProxy tone="negative" as="h4">
          {'Subheadline tone negative'}
        </SubheadlineProxy>
      </VisualSpec>

      <VisualSpec label="Subheadline - h5">
        <SubheadlineProxy as="h5">{'Smaller subheadline'}</SubheadlineProxy>
      </VisualSpec>

      <VisualSpec label="Subheadline - h4 (intl message)">
        <SubheadlineProxy as="h4" intlMessage={intlMessage} />
      </VisualSpec>

      <VisualSpec label="Subheadline - h5 (intl message)">
        <SubheadlineProxy as="h5" intlMessage={intlMessage} />
      </VisualSpec>
    </>
  ),
};
