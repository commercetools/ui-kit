import React from 'react';
import { CollapsiblePanel } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../test/percy';

export const routePath = '/collapsible-panel';

export const component = () => (
  <Suite>
    <Spec label="condensed - dark">
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
    </Spec>
    <Spec label="condensed - light">
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
    </Spec>
    <Spec label="condensed - light - hideExpansionControls">
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
    </Spec>
    <Spec label="condensed - light - isDisabled">
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
    </Spec>
    <Spec label="regular (not condensed) - dark">
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
    </Spec>
    <Spec label="regular (not condensed) - dark - hideExpansionControls">
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
    </Spec>
    <Spec label="regular (not condensed) - dark - isDisabled">
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
    </Spec>
    <Spec label="regular (not condensed) - light">
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
    </Spec>
    <Spec label="condensed - light and urgent">
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
    </Spec>
    <Spec label="condensed - dark and urgent">
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
    </Spec>
    <Spec label="condensed - dark and urgent - isDisabled">
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
    </Spec>
    <Spec label="regular (not condensed) - light and urgent">
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
    </Spec>
    <Spec label="regular (not condensed) - dark and urgent">
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
    </Spec>
    <Spec label="regular (not condensed) - dark and urgent - hideExpansionControls">
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
    </Spec>
    <Spec label="regular (not condensed) - dark and urgent - isDisabled">
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
    </Spec>
    <Spec label="regular (not condensed) - headerControls aligned to left">
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
    </Spec>
    <Spec label="regular (not condensed) - horizontalConstraint set to scale">
      <CollapsiblePanel
        header="Header"
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
    </Spec>
    <Spec label="regular (not condensed) - horizontalConstraint set to 6">
      <CollapsiblePanel
        header="Header"
        description="Some description"
        isDisabled={false}
        tone="primary"
        headerControls="headerControl"
        theme="dark"
        secondaryHeader="Secondary Header"
        horizontalConstraint={6}
      >
        Content
      </CollapsiblePanel>
    </Spec>
    <Spec label="regular (not condensed) - horizontalConstraint set to 11">
      <CollapsiblePanel
        header="Header"
        description="Some description"
        isDisabled={false}
        tone="primary"
        headerControls="headerControl"
        theme="dark"
        secondaryHeader="Secondary Header"
        horizontalConstraint={11}
      >
        Content
      </CollapsiblePanel>
    </Spec>
  </Suite>
);
