import type { ComponentProps } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { horizontalConstraintArgType, hideControls } from '@/storybook-helpers';
import { PrimaryButton } from '@commercetools-uikit/buttons';
import type { Meta, StoryObj } from '@storybook/react';
import Tooltip from './tooltip';

const CustomWrapper = styled.div`
  display: block;
  background-color: pink;
`;

const CustomBody = styled.div`
  font-size: 0.875rem;
  color: red;
`;

type TooltipPropsAndCustomArgs = ComponentProps<typeof Tooltip> & {
  fullWidth?: boolean;
  customBodyWrapper?: boolean;
};

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    ...hideControls(['children']),
    placement: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'right',
        'right-start',
        'right-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
      ],
    },
    horizontalConstraint: horizontalConstraintArgType(),
  },
  decorators: [
    (Story) => (
      <div
        css={css`
          padding: 80px 0 80px 80px;
        `}
      >
        <p>With ui kit button</p>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<TooltipPropsAndCustomArgs>;

export default meta;

type Story = StoryObj<TooltipPropsAndCustomArgs>;

export const Default: Story = {
  args: {
    off: false,
    title: 'Tooltip text.',
    showAfter: 300,
    closeAfter: 200,
    fullWidth: false,
    customBodyWrapper: false,
    horizontalConstraint: 'scale',
    placement: 'top',
  },
  render: (args) => {
    const { fullWidth, customBodyWrapper } = args;
    return (
      <Tooltip
        {...args}
        components={{
          WrapperComponent: fullWidth ? CustomWrapper : undefined,
          BodyComponent: customBodyWrapper ? CustomBody : undefined,
        }}
      >
        <div
          css={css`
            width: min-content;
            cursor: not-allowed;
            > :disabled {
              pointer-events: none;
            }
          `}
        >
          <PrimaryButton onClick={() => {}} label="Submit" />
        </div>
      </Tooltip>
    );
  },
};