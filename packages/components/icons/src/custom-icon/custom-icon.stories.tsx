import type { Meta, StoryObj } from '@storybook/react-vite';
import styled from '@emotion/styled';
import Text from '@commercetools-uikit/text';
import Spacings from '@commercetools-uikit/spacings';
import CustomIcon from './custom-icon';
import CustomReactSvg from './../fixtures/CustomIconReact';
import rawSvg from './../fixtures/raw-svg';
import { VisualSpec } from '@/storybook-helpers';

const meta: Meta<typeof CustomIcon> = {
  title: 'Text & Media/Icons/CustomIcon',
  component: CustomIcon,
  argTypes: {
    icon: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof CustomIcon>;

/**
 * This component is meant to be used whenever consumers need to render an icon which is not part of the ui-kit icon set.
 *
 * In order to keep visual consistency, we want to keep the available sizes of all icons equal. Bear in mind we would expect custom SVG icons to not contain size attributes so it can be controlled based on the components size attribute.
 */
export const BasicExample: Story = {
  args: {
    icon: <CustomReactSvg />,
  },
};

const IconItem = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const LeadingIconList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
`;

const LeadingIconItem = styled(IconItem)`
  gap: 16px;
`;

const leadingIconSizes = ['10', '20', '30', '40'] as const;

export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label={`Custom Icon - React Element`}>
        <LeadingIconList>
          {leadingIconSizes.map((size) => (
            <LeadingIconItem key={size}>
              <Spacings.Stack alignItems="center">
                <CustomIcon size={size} icon={<CustomReactSvg />} />
                <Text.Detail>{`size ${size}`}</Text.Detail>
              </Spacings.Stack>
            </LeadingIconItem>
          ))}
        </LeadingIconList>
      </VisualSpec>
      <VisualSpec label={`Custom Icon - SVG String`}>
        <LeadingIconList>
          {leadingIconSizes.map((size) => (
            <LeadingIconItem key={size}>
              <Spacings.Stack alignItems="center">
                <CustomIcon size={size} icon={rawSvg.clock} />
                <Text.Detail>{` size ${size}`}</Text.Detail>
              </Spacings.Stack>
            </LeadingIconItem>
          ))}
        </LeadingIconList>
      </VisualSpec>
      <VisualSpec label={`Custom Icon - No Border`}>
        <LeadingIconList>
          {leadingIconSizes.map((size) => (
            <LeadingIconItem key={size}>
              <Spacings.Stack alignItems="center">
                <CustomIcon
                  size={size}
                  icon={<CustomReactSvg />}
                  hasBorder={false}
                />
                <Text.Detail>{`size ${size}`}</Text.Detail>
              </Spacings.Stack>
            </LeadingIconItem>
          ))}
        </LeadingIconList>
      </VisualSpec>
    </>
  ),
};
