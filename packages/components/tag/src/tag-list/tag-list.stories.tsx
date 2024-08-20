import type { Meta, StoryObj } from '@storybook/react';
import TagList from './tag-list';
import Tag from './../tag';

const fruits = [
  'apples',
  'bananas',
  'cherries',
  'grapes',
  'oranges',
  'peaches',
  'pears',
  'plums',
  'strawberries',
  'watermelons',
  'blueberries',
  'blackberries',
  'raspberries',
  'mangoes',
  'pineapples',
  'pomegranates',
  'kiwis',
  'lemons',
  'limes',
  'papayas',
  'apricots',
  'nectarines',
  'figs',
  'dates',
  'coconuts',
  'cantaloupes',
  'honeydews',
  'tangerines',
  'clementines',
  'persimmons',
  'cranberries',
  'guavas',
  'lychees',
  'jackfruits',
  'dragonfruits',
  'passionfruits',
  'mulberries',
  'gooseberries',
  'elderberries',
  'starfruits',
];

const meta: Meta<typeof TagList> = {
  title: 'components/Tags/TagList',
  component: TagList,
};
export default meta;

type Story = StoryObj<typeof TagList>;

/** Displays `<Tag>`s as inline-items, items will wrap onto the next line if necessary. */
export const BasicExample: Story = {
  args: {
    children: fruits.map((tag, index) => <Tag key={index}>{tag}</Tag>),
  },
};
