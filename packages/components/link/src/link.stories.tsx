import type { Meta, StoryObj } from '@storybook/react-vite';
import { BrowserRouter as Router } from 'react-router-dom';
import Link from './link';
import { VisualSpec } from '@/storybook-helpers';

const meta: Meta<typeof Link> = {
  title: 'components/Link',
  component: Link,
};
export default meta;

type Story = StoryObj<typeof Link>;

export const BasicExample: Story = {
  decorators: [
    (Story) => (
      <Router>
        <Story />
      </Router>
    ),
  ],
  args: {
    children: 'Sample Link',
    to: '/path/to/link/to',
  },
};

export const ExternalLink: Story = {
  args: {
    children: 'External Text',
    to: '/path/to/link/to',
    isExternal: true,
  },

  decorators: [
    (Story) => (
      <Router>
        <Story />
      </Router>
    ),
  ],
};

const intlMessage = { id: 'link', defaultMessage: 'Link' };

export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  decorators: [
    (Story) => (
      <Router>
        <Story />
      </Router>
    ),
  ],
  render: () => (
    <>
      <VisualSpec label="regular">
        <Link to="/">A label text</Link>
      </VisualSpec>
      <VisualSpec label="external">
        <Link to="/" isExternal>
          A label text
        </Link>
      </VisualSpec>
      <VisualSpec label="intlMessage">
        <Link to="/" intlMessage={intlMessage} />
      </VisualSpec>
      <VisualSpec label="tone - inverted" backgroundColor="black">
        <Link to="/" tone="inverted">
          An inverted label text
        </Link>
      </VisualSpec>
      <VisualSpec label="Link respecting parent font-size">
        <div style={{ fontSize: 24 }}>
          <Link to="/">A label text</Link>
        </div>
      </VisualSpec>
      <VisualSpec label="tone - secondary">
        <Link to="/" tone="secondary">
          A secondary label text
        </Link>
      </VisualSpec>
    </>
  ),
};
