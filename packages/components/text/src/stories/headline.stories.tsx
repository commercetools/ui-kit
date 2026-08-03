import type { Meta, StoryObj } from '@storybook/react-vite';
import { VisualSpec } from '@/storybook-helpers';
import { HeadlineProxy } from './../text.proxies';

const intlMessage = { id: 'Title', defaultMessage: 'Hello' };

const meta: Meta<typeof HeadlineProxy> = {
  title: 'Text & Media/Text/Text.Headline',
  component: HeadlineProxy,
};
export default meta;

type Story = StoryObj<typeof HeadlineProxy>;

/** Wraps the given text in the given (via `as`-property) HTML header tag. */
export const BasicExample: Story = {
  args: {
    as: 'h1',
    children: 'Hello Headline!',
  },
};

export const AllVariants: StoryObj = {
  tags: ['vrt'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="Headline - h1">
        <HeadlineProxy as="h1">{'Title H1'}</HeadlineProxy>
      </VisualSpec>

      <VisualSpec label="Headline - h1 - truncated">
        <div style={{ width: 200 }}>
          <HeadlineProxy as="h1" truncate={true}>
            {'A longer title that should be truncated'}
          </HeadlineProxy>
        </div>
      </VisualSpec>

      <VisualSpec label="Headline - h1 - nowrap">
        <div style={{ width: 200, overflow: 'hidden' }}>
          <HeadlineProxy as="h1" nowrap={true}>
            {'A longer title that should not be new line'}
          </HeadlineProxy>
        </div>
      </VisualSpec>

      <VisualSpec label="Headline - tone - primary">
        <HeadlineProxy tone="primary" as="h1">
          {'Headline tone primary'}
        </HeadlineProxy>
      </VisualSpec>

      <VisualSpec label="Headline - tone - secondary">
        <HeadlineProxy tone="secondary" as="h1">
          {'Headline tone secondary'}
        </HeadlineProxy>
      </VisualSpec>

      <VisualSpec label="Headline - tone - tertiary">
        <HeadlineProxy tone="tertiary" as="h1">
          {'Headline tone tertiary'}
        </HeadlineProxy>
      </VisualSpec>

      <VisualSpec label="Headline - tone - information">
        <HeadlineProxy tone="information" as="h1">
          {'Headline tone information'}
        </HeadlineProxy>
      </VisualSpec>

      <VisualSpec label="Headline - tone - positive">
        <HeadlineProxy tone="positive" as="h1">
          {'Headline tone positive'}
        </HeadlineProxy>
      </VisualSpec>

      <VisualSpec label="Headline - tone - negative">
        <HeadlineProxy tone="negative" as="h1">
          {'Headline tone negative'}
        </HeadlineProxy>
      </VisualSpec>

      <VisualSpec label="Headline - h2">
        <HeadlineProxy as="h2">{'Title H2'}</HeadlineProxy>
      </VisualSpec>

      <VisualSpec label="Headline - h3">
        <HeadlineProxy as="h3">{'Title H3'}</HeadlineProxy>
      </VisualSpec>

      <VisualSpec label="Headline - h1 (intl message)">
        <HeadlineProxy as="h1" intlMessage={intlMessage} />
      </VisualSpec>

      <VisualSpec label="Headline - h2 (intl message)">
        <HeadlineProxy as="h2" intlMessage={intlMessage} />
      </VisualSpec>

      <VisualSpec label="Headline - h3 (intl message)">
        <HeadlineProxy as="h3" intlMessage={intlMessage} />
      </VisualSpec>
    </>
  ),
};
