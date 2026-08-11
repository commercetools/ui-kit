import { type ComponentProps } from 'react';
import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { VisualSpec } from '@/storybook-helpers';
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

export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="condensed - dark">
        <CollapsiblePanel
          header="Header"
          description="Some description"
          isDisabled={false}
          tone="primary"
          headerControls="headerControl"
          theme="dark"
          condensed
          secondaryHeader="Secondary Header"
        >
          Content
        </CollapsiblePanel>
      </VisualSpec>
      <VisualSpec label="condensed - light">
        <CollapsiblePanel
          header="Header"
          description="Some description"
          isDisabled={false}
          tone="primary"
          headerControls="headerControl"
          theme="light"
          condensed
          secondaryHeader="Secondary Header"
        >
          Content
        </CollapsiblePanel>
      </VisualSpec>
      <VisualSpec label="condensed - light - hideExpansionControls">
        <CollapsiblePanel
          header="Header"
          description="Some description"
          isDisabled={false}
          hideExpansionControls={true}
          tone="primary"
          headerControls="headerControl"
          theme="light"
          condensed
          secondaryHeader="Secondary Header"
        >
          Content
        </CollapsiblePanel>
      </VisualSpec>
      <VisualSpec label="condensed - light - isDisabled">
        <CollapsiblePanel
          header="Header"
          description="Some description"
          isDisabled={true}
          tone="primary"
          headerControls="headerControl"
          theme="light"
          condensed
          secondaryHeader="Secondary Header"
        >
          Content
        </CollapsiblePanel>
      </VisualSpec>
      <VisualSpec label="regular (not condensed) - dark">
        <CollapsiblePanel
          header={<CollapsiblePanel.Header>Header</CollapsiblePanel.Header>}
          description="Some description"
          isDisabled={false}
          tone="primary"
          headerControls="headerControl"
          theme="dark"
          secondaryHeader="Secondary Header"
        >
          Content
        </CollapsiblePanel>
      </VisualSpec>
      <VisualSpec label="regular (not condensed) - dark - hideExpansionControls">
        <CollapsiblePanel
          header={<CollapsiblePanel.Header>Header</CollapsiblePanel.Header>}
          description="Some description"
          isDisabled={false}
          hideExpansionControls={true}
          tone="primary"
          headerControls="headerControl"
          theme="dark"
          secondaryHeader="Secondary Header"
        >
          Content
        </CollapsiblePanel>
      </VisualSpec>
      <VisualSpec label="regular (not condensed) - dark - isDisabled">
        <CollapsiblePanel
          header={<CollapsiblePanel.Header>Header</CollapsiblePanel.Header>}
          description="Some description"
          isDisabled={true}
          tone="primary"
          headerControls="headerControl"
          theme="dark"
          secondaryHeader="Secondary Header"
        >
          Content
        </CollapsiblePanel>
      </VisualSpec>
      <VisualSpec label="regular (not condensed) - light">
        <CollapsiblePanel
          header={<CollapsiblePanel.Header>Header</CollapsiblePanel.Header>}
          description="Some description"
          isDisabled={false}
          tone="primary"
          headerControls="headerControl"
          theme="light"
          secondaryHeader="Secondary Header"
        >
          Content
        </CollapsiblePanel>
      </VisualSpec>
      <VisualSpec label="condensed - light and urgent">
        <CollapsiblePanel
          header={<CollapsiblePanel.Header>Header</CollapsiblePanel.Header>}
          description="Some description"
          isDisabled={false}
          tone="urgent"
          headerControls="headerControl"
          theme="light"
          condensed
          secondaryHeader="Secondary Header"
        >
          Content
        </CollapsiblePanel>
      </VisualSpec>
      <VisualSpec label="condensed - dark and urgent">
        <CollapsiblePanel
          header={<CollapsiblePanel.Header>Header</CollapsiblePanel.Header>}
          description="Some description"
          isDisabled={false}
          tone="urgent"
          headerControls="headerControl"
          theme="dark"
          condensed
          secondaryHeader="Secondary Header"
        >
          Content
        </CollapsiblePanel>
      </VisualSpec>
      <VisualSpec label="condensed - dark and urgent - isDisabled">
        <CollapsiblePanel
          header={<CollapsiblePanel.Header>Header</CollapsiblePanel.Header>}
          description="Some description"
          isDisabled={true}
          tone="urgent"
          headerControls="headerControl"
          theme="dark"
          condensed
          secondaryHeader="Secondary Header"
        >
          Content
        </CollapsiblePanel>
      </VisualSpec>
      <VisualSpec label="regular (not condensed) - light and urgent">
        <CollapsiblePanel
          header={<CollapsiblePanel.Header>Header</CollapsiblePanel.Header>}
          description="Some description"
          isDisabled={false}
          tone="urgent"
          headerControls="headerControl"
          theme="light"
          secondaryHeader="Secondary Header"
        >
          Content
        </CollapsiblePanel>
      </VisualSpec>
      <VisualSpec label="regular (not condensed) - dark and urgent">
        <CollapsiblePanel
          header={<CollapsiblePanel.Header>Header</CollapsiblePanel.Header>}
          description="Some description"
          isDisabled={false}
          tone="urgent"
          headerControls="headerControl"
          theme="dark"
          secondaryHeader="Secondary Header"
        >
          Content
        </CollapsiblePanel>
      </VisualSpec>
      <VisualSpec label="regular (not condensed) - dark and urgent - hideExpansionControls">
        <CollapsiblePanel
          header={<CollapsiblePanel.Header>Header</CollapsiblePanel.Header>}
          description="Some description"
          isDisabled={false}
          hideExpansionControls={true}
          tone="urgent"
          headerControls="headerControl"
          theme="dark"
          secondaryHeader="Secondary Header"
        >
          Content
        </CollapsiblePanel>
      </VisualSpec>
      <VisualSpec label="regular (not condensed) - dark and urgent - isDisabled">
        <CollapsiblePanel
          header={<CollapsiblePanel.Header>Header</CollapsiblePanel.Header>}
          description="Some description"
          isDisabled={true}
          tone="urgent"
          headerControls="headerControl"
          theme="dark"
          secondaryHeader="Secondary Header"
        >
          Content
        </CollapsiblePanel>
      </VisualSpec>
      <VisualSpec label="regular (not condensed) - headerControls aligned to left">
        <CollapsiblePanel
          header={<CollapsiblePanel.Header>Header</CollapsiblePanel.Header>}
          description="Some description"
          isDisabled={true}
          tone="urgent"
          headerControls="headerControl"
          theme="dark"
          secondaryHeader="Secondary Header"
          headerControlsAlignment="left"
        >
          Content
        </CollapsiblePanel>
      </VisualSpec>
      <VisualSpec label="regular (not condensed) - horizontalConstraint set to scale">
        <CollapsiblePanel
          header={<CollapsiblePanel.Header>Header</CollapsiblePanel.Header>}
          description="Some description"
          isDisabled={false}
          tone="primary"
          headerControls="headerControl"
          theme="dark"
          secondaryHeader="Secondary Header"
          horizontalConstraint="scale"
        >
          Content
        </CollapsiblePanel>
      </VisualSpec>
      <VisualSpec label="regular (not condensed) - horizontalConstraint set to 6">
        <CollapsiblePanel
          header={<CollapsiblePanel.Header>Header</CollapsiblePanel.Header>}
          description="Some description"
          isDisabled={false}
          tone="primary"
          headerControls="headerControl"
          theme="dark"
          horizontalConstraint={6}
        >
          Content
        </CollapsiblePanel>
      </VisualSpec>
      <VisualSpec label="condensed - horizontalConstraint set to 11">
        <CollapsiblePanel
          header="Header"
          description="Some description"
          isDisabled={false}
          tone="primary"
          headerControls="headerControl"
          theme="dark"
          condensed
          secondaryHeader="Secondary Header"
          horizontalConstraint={11}
        >
          Content
        </CollapsiblePanel>
      </VisualSpec>
    </>
  ),
};
