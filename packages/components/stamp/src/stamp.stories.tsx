import type { Meta, StoryObj } from '@storybook/react';
import * as icons from '@commercetools-uikit/icons';
import Spacings from '@commercetools-uikit/spacings';
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
  argTypes: {
    tone: {
      table: {
        disable: true,
      },
    },
    children: {
      table: {
        disable: true,
      },
    },
    icon: {
      table: {
        disable: true,
      },
    },
    label: {
      table: {
        disable: true,
      },
    },
  },
  render: (args) => {
    return (
      <Spacings.Stack>
        {availableTones.map((tone) => {
          const iconIndex = getRandomIndex(0, numberOfIcons);
          const Icon = icons[iconNames[iconIndex] as keyof typeof icons];
          return (
            <Spacings.Inline key={tone} alignItems="center">
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
            </Spacings.Inline>
          );
        })}
      </Spacings.Stack>
    );
  },
};
