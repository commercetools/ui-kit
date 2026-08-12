import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import styled from '@emotion/styled';
import Text from '@commercetools-uikit/text';
import Spacings from '@commercetools-uikit/spacings';
import LeadingIcon from './leading-icon';
import AngleDownIcon from './../generated/AngleDownReact';
import rawSvg from './../fixtures/raw-svg';
import { iconArgType, VisualSpec } from '@/storybook-helpers';

const meta: Meta<typeof LeadingIcon> = {
  title: 'Text & Media/Icons/LeadingIcon',
  component: LeadingIcon,
  argTypes: {
    icon: iconArgType,
  },
};
export default meta;

type Story = StoryFn<typeof LeadingIcon>;

/**
 * The leading icon is a an eye-catching visual element that should be used when an additional visual prominence
 * is needed for a content section in the UI. The different colours in combination with the icons can be utilised
 * to create certain categorisation of the elements in the UI.
 */
export const BasicExample: Story = {
  args: {
    // @ts-ignore todo: fix (the component wants a react element, storybook wants a string)
    icon: 'AngleDownIcon',
    color: 'neutral',
    size: '20',
    isInverted: false,
  },
};

const IconItem = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const LeadingIconList = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  gap: 16px;
`;

const LeadingIconItem = styled(IconItem)`
  gap: 16px;
`;

const leadingIconColors = [
  'accent',
  'brown',
  'turquoise',
  'purple',
  'neutral',
  'white',
] as const;
const leadingIconSizes = ['10', '20', '30', '40'] as const;

// Pinned so the frame doesn't silently change icon when the icon set grows.
const IconForLeadingIcon = AngleDownIcon;

export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      {leadingIconSizes.map((size) => (
        <VisualSpec key={size} label={`Leading Icon - Size: ${size}`}>
          <LeadingIconList columns={leadingIconColors.length}>
            {leadingIconColors.map((color) => (
              <LeadingIconItem key={`${size}-${color}`}>
                <Spacings.Stack alignItems="center">
                  <LeadingIcon
                    size={size}
                    color={color}
                    icon={<IconForLeadingIcon />}
                  />
                  <Text.Detail>{`${color}`}</Text.Detail>
                </Spacings.Stack>
                <Spacings.Stack alignItems="center">
                  <LeadingIcon
                    size={size}
                    color={color}
                    icon={<IconForLeadingIcon />}
                    isInverted={true}
                  />
                  <Text.Detail>{`inverted`}</Text.Detail>
                </Spacings.Stack>
              </LeadingIconItem>
            ))}
          </LeadingIconList>
        </VisualSpec>
      ))}
      <VisualSpec label={`Leading Icon - Custom SVG`}>
        <LeadingIconList columns={leadingIconSizes.length}>
          {leadingIconSizes.map((size) => (
            <LeadingIconItem key={size}>
              <Spacings.Stack alignItems="center">
                <LeadingIcon size={size} svg={rawSvg.clock} />
                <Text.Detail>{`custom-svg size ${size}`}</Text.Detail>
              </Spacings.Stack>
              <Spacings.Stack alignItems="center">
                <LeadingIcon size={size} svg={rawSvg.clock} isInverted={true} />
                <Text.Detail>{`inverted`}</Text.Detail>
              </Spacings.Stack>
            </LeadingIconItem>
          ))}
        </LeadingIconList>
      </VisualSpec>
    </>
  ),
};
