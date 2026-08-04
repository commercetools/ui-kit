import { BrowserRouter as Router } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react-vite';
import Constraints from '@commercetools-uikit/constraints';
import { VisualSpec } from '@/storybook-helpers';
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

const examplesLong = Array(15)
  .fill(undefined)
  .map((_, i) => i + ' fish');

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
      <VisualSpec label="Tag list - with remove">
        <TagList>
          {examplesLong.map((tag, index) => (
            <Tag type="normal" to="foo/bar" onRemove={() => {}} key={index}>
              {tag}
            </Tag>
          ))}
        </TagList>
      </VisualSpec>
      <VisualSpec label="Tag list - no remove">
        <TagList>
          {examplesLong.map((tag, index) => (
            <Tag type="normal" to="foo/bar" key={index}>
              {tag}
            </Tag>
          ))}
        </TagList>
      </VisualSpec>
      <VisualSpec label="Tag list - multi rows">
        <Constraints.Horizontal max={5}>
          <TagList>
            {examplesLong.map((tag, index) => (
              <Tag type="normal" to="foo/bar" key={index}>
                {tag}
              </Tag>
            ))}
          </TagList>
        </Constraints.Horizontal>
      </VisualSpec>
    </>
  ),
};
