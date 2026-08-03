import type { Meta, StoryObj } from '@storybook/react-vite';
import { VisualSpec } from '@/storybook-helpers';
import { CaptionProxy } from './../text.proxies';

const intlMessage = { id: 'Title', defaultMessage: 'Hello' };

const meta: Meta<typeof CaptionProxy> = {
  title: 'Text & Media/Text/Text.Caption',
  component: CaptionProxy,
};
export default meta;

type Story = StoryObj<typeof CaptionProxy>;

/** Wraps the text in the smallest available font size and accepts `tone` and `fontWeight` props. */
export const BasicExample: Story = {
  args: {
    children: 'Hello Caption!',
  },
};

export const AllVariants: StoryObj = {
  tags: ['vrt'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="Caption">
        <CaptionProxy>Caption text</CaptionProxy>
      </VisualSpec>

      <VisualSpec label="Caption - fontWeight - regular">
        <CaptionProxy fontWeight="regular">Caption text regular</CaptionProxy>
      </VisualSpec>

      <VisualSpec label="Caption - fontWeight - medium">
        <CaptionProxy fontWeight="medium">Caption text medium</CaptionProxy>
      </VisualSpec>

      <VisualSpec label="Caption - fontWeight - bold">
        <CaptionProxy fontWeight="bold">Caption text bold</CaptionProxy>
      </VisualSpec>

      <VisualSpec label="Caption - italic">
        <CaptionProxy isItalic={true}>Caption text italic</CaptionProxy>
      </VisualSpec>

      <VisualSpec label="Caption - strikethrough">
        <CaptionProxy isStrikethrough={true}>
          Caption text strikethrough
        </CaptionProxy>
      </VisualSpec>

      <VisualSpec label="Caption - tone - primary">
        <CaptionProxy tone="primary">Caption text primary</CaptionProxy>
      </VisualSpec>

      <VisualSpec label="Caption - tone - secondary">
        <CaptionProxy tone="secondary">Caption text secondary</CaptionProxy>
      </VisualSpec>

      <VisualSpec label="Caption - tone - tertiary">
        <CaptionProxy tone="tertiary">Caption text tertiary</CaptionProxy>
      </VisualSpec>

      <VisualSpec label="Caption - tone - information">
        <CaptionProxy tone="information">Caption text information</CaptionProxy>
      </VisualSpec>

      <VisualSpec label="Caption - tone - positive">
        <CaptionProxy tone="positive">Caption text positive</CaptionProxy>
      </VisualSpec>

      <VisualSpec label="Caption - tone - negative">
        <CaptionProxy tone="negative">Caption text negative</CaptionProxy>
      </VisualSpec>

      <VisualSpec label="Caption - truncate">
        <div style={{ width: 200 }}>
          <CaptionProxy truncate={true}>
            A longer caption text that needs to be truncated.
          </CaptionProxy>
        </div>
      </VisualSpec>

      <VisualSpec label="Caption - nowrap">
        <div style={{ width: 200 }}>
          <CaptionProxy nowrap={true}>
            A longer title that should not be new line
          </CaptionProxy>
        </div>
      </VisualSpec>

      <VisualSpec label="Caption (intl message)">
        <CaptionProxy intlMessage={intlMessage} />
      </VisualSpec>
    </>
  ),
};
