import React from 'react';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { Detail } from '../src';

export default {
  title: 'Components/Text/Detail',
  component: Detail,
};

const text = 'This is a body text';

const TemplateAll = () => (
  <SpacingsStack>
    <Detail title={text}>{text}</Detail>
    <Detail title={text} isBold={true}>
      {text}
    </Detail>
    <Detail title={text} isItalic={true}>
      {text}
    </Detail>
  </SpacingsStack>
);

const Template = (args) => <Detail {...args} />;
const TemplateDark = (args) => (
  <div style={{ backgroundColor: 'black' }}>
    <Detail {...args} />
  </div>
);

export const Default = TemplateAll.bind({});
Default.args = {};

export const Primary = Template.bind({});
Primary.args = {
  tone: 'primary',
  title: text,
  children: text,
};
export const Secondary = Template.bind({});
Secondary.args = {
  tone: 'secondary',
  title: text,
  children: text,
};
export const Information = Template.bind({});
Information.args = {
  tone: 'information',
  title: text,
  children: text,
};
export const Positive = Template.bind({});
Positive.args = {
  tone: 'information',
  title: text,
  children: text,
};
export const Negative = Template.bind({});
Negative.args = {
  tone: 'negative',
  title: text,
  children: text,
};
export const Inverted = TemplateDark.bind({});
Inverted.args = {
  tone: 'inverted',
  title: text,
  children: text,
};
