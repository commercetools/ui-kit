import type { Meta, StoryObj } from '@storybook/react-vite';
import { VisualSpec } from '@/storybook-helpers';
import { BodyProxy } from './../text.proxies';

const intlMessage = { id: 'Title', defaultMessage: 'Hello' };

const meta: Meta<typeof BodyProxy> = {
  title: 'Text & Media/Text/Text.Body',
  component: BodyProxy,
};
export default meta;

type Story = StoryObj<typeof BodyProxy>;

/** `<Text.Body/>` wraps your text with a `<p>` tag by default. It is used for displaying regular (lengthy) text-content. */
export const BasicExample: Story = {
  args: {
    children: 'Hello World!',
  },
};

export const AllVariants: StoryObj = {
  tags: ['vrt'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="Body">
        <BodyProxy>Body text</BodyProxy>
      </VisualSpec>

      <VisualSpec label="Body - fontWeight - regular">
        <BodyProxy fontWeight="regular">Body text regular</BodyProxy>
      </VisualSpec>

      <VisualSpec label="Body - fontWeight - medium">
        <BodyProxy fontWeight="medium">Body text medium</BodyProxy>
      </VisualSpec>

      <VisualSpec label="Body - fontWeight - bold">
        <BodyProxy fontWeight="bold">Body text bold</BodyProxy>
      </VisualSpec>

      <VisualSpec label="Body - italic">
        <BodyProxy isItalic={true}>Body text italic</BodyProxy>
      </VisualSpec>

      <VisualSpec label="Body - strikethrough">
        <BodyProxy isStrikethrough={true}>Body text strikethrough</BodyProxy>
      </VisualSpec>

      <VisualSpec label="Body - tone - primary">
        <BodyProxy tone="primary">Body text primary</BodyProxy>
      </VisualSpec>

      <VisualSpec label="Body - tone - secondary">
        <BodyProxy tone="secondary">Body text secondary</BodyProxy>
      </VisualSpec>

      <VisualSpec label="Body - tone - tertiary">
        <BodyProxy tone="tertiary">Body text tertiary</BodyProxy>
      </VisualSpec>

      <VisualSpec label="Body - tone - information">
        <BodyProxy tone="information">Body text information</BodyProxy>
      </VisualSpec>

      <VisualSpec label="Body - tone - positive">
        <BodyProxy tone="positive">Body text positive</BodyProxy>
      </VisualSpec>

      <VisualSpec label="Body - tone - negative">
        <BodyProxy tone="negative">Body text negative</BodyProxy>
      </VisualSpec>

      <VisualSpec label="Body - truncate">
        <div style={{ width: 200 }}>
          <BodyProxy truncate={true}>
            A longer body text that needs to be truncated.
          </BodyProxy>
        </div>
      </VisualSpec>

      <VisualSpec label="Body - nowrap">
        <div style={{ width: 200, overflow: 'hidden' }}>
          <BodyProxy nowrap={true}>
            A longer title that should not be new line
          </BodyProxy>
        </div>
      </VisualSpec>

      <VisualSpec label="Body - inline">
        <>
          <BodyProxy as="span">One inline body text{'. '}</BodyProxy>
          <BodyProxy as="span">A second inline text.</BodyProxy>
        </>
      </VisualSpec>

      <VisualSpec label="Body (intl message)">
        <BodyProxy intlMessage={intlMessage} />
      </VisualSpec>
    </>
  ),
};
