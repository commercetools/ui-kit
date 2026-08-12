import type { Decorator } from '@storybook/react-vite';

// Chromatic crops to rendered content, so focus rings and shadows painted at
// the edge clip. Padding outside the story can't reach in.
const paddedStyle = { padding: '1rem' };

export const withPaddingDecorator: Decorator = (Story, context) =>
  // `fullscreen` stories mean to touch the edges.
  context.parameters?.layout === 'fullscreen' ? (
    <Story />
  ) : (
    <div style={paddedStyle}>
      <Story />
    </div>
  );
