import type { Decorator } from '@storybook/react-vite';

/*
  Chromatic crops each snapshot to the story's rendered content, so anything
  painted at the very edge clips: a group heading's ascenders, a focus ring, a
  box-shadow. Body or `layout: 'padded'` padding sits outside the crop and can't
  reach in, so the room has to come from inside the story.
*/
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
