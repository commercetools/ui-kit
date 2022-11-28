import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
// import { storiesOf } from '@storybook/react';
// import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
// import Section from '../../../../docs/.storybook/decorators/section';
import Avatar from './avatar';
// import Readme from '../README.md';

// storiesOf('Components|Avatar', module)
//   .addDecorator(withKnobs)
//   .addParameters({
//     readme: {
//       // Show readme at the addons panel
//       sidebar: Readme,
//     },
//   })
//   .add('Avatar', () => (
//     <Section>
//       <Avatar
//         firstName={text('firstName', 'Jon')}
//         lastName={text('lastName', 'Snow')}
//         gravatarHash={text('gravatarHash', '')}
//         isHighlighted={boolean('isHighlighted', false)}
//         size={select('size', ['s', 'm', 'l'], 'l')}
//       />
//     </Section>
//   ));

const config = {
  title: 'Avatar',
  component: Avatar,
  // argTypes: {
  //   size: {
  //     options: ['s', 'm', 'l'],
  //     control: { type: 'select' }
  //   }
  // }
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const BasicAvatar = Template.bind({});
BasicAvatar.args = {
  firstName: 'Jon',
  lastName: 'Snow',
  gravatarHash: '',
  isHighlighted: false,
  size: 'l',
};

export default config;
