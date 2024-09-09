import { type ComponentProps } from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import CollapsiblePanel from './collapsible-panel';
import CollapsiblePanelHeader from './collapsible-panel-header';

type CollapsiblePanelProps = ComponentProps<typeof CollapsiblePanel>;

const meta: Meta<CollapsiblePanelProps> = {
  title: 'components/Panels/CollapsiblePanel',
  component: CollapsiblePanel,
  argTypes: {
    header: {
      control: 'text',
    },
    secondaryHeader: {
      control: 'text',
    },
    headerControls: {
      control: 'text',
    },
  },
};
export default meta;

export const BasicExample: StoryFn<CollapsiblePanelProps> = ({
  condensed,
  header,
  ...args
}) => {
  return (
    <CollapsiblePanel
      condensed={condensed}
      header={
        condensed ? (
          header
        ) : (
          <CollapsiblePanelHeader>{header}</CollapsiblePanelHeader>
        )
      }
      {...args}
    />
  );
};

BasicExample.args = {
  id: '12345',
  description: 'Description',
  header: 'Header',
  secondaryHeader: 'Subtitle',
  isSticky: false,
  isDisabled: false,
  tone: 'primary',
  condensed: false,
  hideExpansionControls: false,
  isClosed: undefined,
  headerControls: 'Here you can place controls',
  theme: 'light',
  children: 'Content',
};
