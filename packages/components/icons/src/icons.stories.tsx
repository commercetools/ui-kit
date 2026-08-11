import type { ComponentType } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import styled from '@emotion/styled';
import type { TIconProps } from '@commercetools-uikit/design-system';
import Text from '@commercetools-uikit/text';
import { VisualSpec } from '@/storybook-helpers';
import * as icons from './index';

// `!dev` keeps these out of the sidebar: every color/size combination is
// snapshot coverage, not something to navigate.
const meta: Meta = {
  // Pinned so renaming the title does not orphan the existing baselines.
  id: 'text-media-icons-colors',
  title: 'Text & Media/Icons/IconColors',
  tags: ['vrt', '!autodocs', '!dev'],
  parameters: { chromatic: { disableSnapshot: false, viewports: [1600] } },
};
export default meta;

const IconList = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
`;

const IconItem = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const IconContainer = styled.div<{ big: boolean }>`
  margin: 8px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.big ? '50px' : '25px')};
`;

type TIconName = keyof typeof icons;

const allIconNames = (Object.keys(icons) as TIconName[]).sort();

const sizes = ['10', '20', '30', '40', 'scale'] as const;

const renderIcon = (
  iconName: TIconName,
  color: TIconProps['color'],
  size: TIconProps['size']
) => {
  const Icon: ComponentType<TIconProps> = icons[iconName];
  return (
    <IconItem key={`${iconName}-${size}-${color}`}>
      <IconContainer big={size === 'scale'}>
        <Icon color={color} size={size} />
      </IconContainer>
      <Text.Body>{iconName}</Text.Body>
    </IconItem>
  );
};

const renderColor = (color: TIconProps['color']) => () =>
  (
    <>
      {sizes.map((size) => (
        <VisualSpec
          key={size}
          label={`All Icons - Color: ${color} / Size: ${size}`}
        >
          <IconList>
            {allIconNames.map((iconName) => renderIcon(iconName, color, size))}
          </IconList>
        </VisualSpec>
      ))}
    </>
  );

export const Solid: StoryObj = { render: renderColor('solid') };
export const Neutral60: StoryObj = { render: renderColor('neutral60') };
export const Surface: StoryObj = { render: renderColor('surface') };
export const Info: StoryObj = { render: renderColor('info') };
export const Primary: StoryObj = { render: renderColor('primary') };
export const Primary40: StoryObj = { render: renderColor('primary40') };
export const Warning: StoryObj = { render: renderColor('warning') };
export const Error: StoryObj = { render: renderColor('error') };
export const Success: StoryObj = { render: renderColor('success') };
