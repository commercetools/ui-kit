import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { VisualSpec } from '@/storybook-helpers';
import { DetailProxy } from './../text.proxies';

const intlMessage = { id: 'Title', defaultMessage: 'Hello' };

const meta: Meta<typeof DetailProxy> = {
  title: 'Text & Media/Text/Text.Detail',
  component: DetailProxy,
};
export default meta;

type Story = StoryFn<typeof DetailProxy>;

/** Wraps the given text in a `<small>` semantic tag. It accepts a tone prop to properly style the text. */
export const BasicExample: Story = (args) => {
  return <DetailProxy {...args} />;
};

BasicExample.args = {
  children: 'Hello Detail!',
};

export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="Detail">
        <DetailProxy>Detail text</DetailProxy>
      </VisualSpec>

      <VisualSpec label="Detail - fontWeight - regular">
        <DetailProxy fontWeight="regular">Detail text regular</DetailProxy>
      </VisualSpec>

      <VisualSpec label="Detail - fontWeight - medium">
        <DetailProxy fontWeight="medium">Detail text medium</DetailProxy>
      </VisualSpec>

      <VisualSpec label="Detail - fontWeight - bold">
        <DetailProxy fontWeight="bold">Detail text bold</DetailProxy>
      </VisualSpec>

      <VisualSpec label="Detail - italic">
        <DetailProxy isItalic={true}>Detail text italic</DetailProxy>
      </VisualSpec>

      <VisualSpec label="Detail - strikethrough">
        <DetailProxy isStrikethrough={true}>
          Detail text strikethrough
        </DetailProxy>
      </VisualSpec>

      <VisualSpec label="Detail - tone - primary">
        <DetailProxy tone="primary">Detail text primary</DetailProxy>
      </VisualSpec>

      <VisualSpec label="Detail - tone - secondary">
        <DetailProxy tone="secondary">Detail text secondary</DetailProxy>
      </VisualSpec>

      <VisualSpec label="Detail - tone - tertiary">
        <DetailProxy tone="tertiary">Detail text tertiary</DetailProxy>
      </VisualSpec>

      <VisualSpec label="Detail - tone - information">
        <DetailProxy tone="information">Detail text information</DetailProxy>
      </VisualSpec>

      <VisualSpec label="Detail - tone - positive">
        <DetailProxy tone="positive">Detail text positive</DetailProxy>
      </VisualSpec>

      <VisualSpec label="Detail - tone - negative">
        <DetailProxy tone="negative">Detail text negative</DetailProxy>
      </VisualSpec>

      <VisualSpec label="Detail - truncate">
        <div style={{ width: 200 }}>
          <DetailProxy truncate={true}>
            A longer detail text that needs to be truncated.
          </DetailProxy>
        </div>
      </VisualSpec>

      <VisualSpec label="Detail - nowrap">
        <div style={{ width: 200, overflow: 'hidden' }}>
          <DetailProxy nowrap={true}>
            A longer title that should not be new line
          </DetailProxy>
        </div>
      </VisualSpec>

      <VisualSpec label="Detail (intl message)">
        <DetailProxy intlMessage={intlMessage} />
      </VisualSpec>
    </>
  ),
};
