import type { Meta, StoryObj } from '@storybook/react';
import * as icons from '@commercetools-uikit/icons';
import SpacingsStack from '../../spacings/spacings-stack';
import SpacingsInline from '../../spacings/spacings-inline';
import Stamp, { availableTones } from './stamp';

const iconNames = Object.keys(icons);
const numberOfIcons = iconNames.length;
const getRandomIndex = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const meta = {
  title: 'Components/Stamp',
  component: Stamp,
  tags: ['autodocs'],
} satisfies Meta<typeof Stamp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isCondensed: false,
  },
  parameters: { controls: { exclude: ['tone', 'children', 'icon', 'label'] } },
  render: (args) => {
    return (
      <SpacingsStack>
        {availableTones.map((tone) => {
          const iconIndex = getRandomIndex(0, numberOfIcons);
          const Icon = icons[iconNames[iconIndex] as keyof typeof icons];
          return (
            <SpacingsInline key={tone} alignItems="center">
              <Stamp
                tone={tone}
                isCondensed={args.isCondensed}
                icon={<Icon />}
                label="Hello"
              />
              <Stamp
                tone={tone}
                isCondensed={args.isCondensed}
                label={`tone="${tone}"`}
              />
            </SpacingsInline>
          );
        })}
      </SpacingsStack>
    );
  },
};
