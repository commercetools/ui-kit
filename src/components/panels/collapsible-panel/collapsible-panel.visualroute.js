// These tests are disabled for now as we couldn't get CollapsiblePanel to
// render in percy. We suspect that this happens for the same reason that we can
// not render the table in Percy.
// We did not get to the bottom of the problem yet, unfortunately.

import React from 'react';
import { CollapsiblePanel } from 'ui-kit';
import { Suite, Spec } from '../../../../test/percy';

export const routePath = '/collapsible-panel';

export const component = () => (
  <Suite>
    <Spec label="condensed">
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
    <Spec label="regular (not condensed)">
      <CollapsiblePanel
        header={<CollapsiblePanel.Header>Header</CollapsiblePanel.Header>}
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
    <Spec label="light">
      <CollapsiblePanel
        header={<CollapsiblePanel.Header>Header</CollapsiblePanel.Header>}
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
    <Spec label="urgent and light">
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
    <Spec label="urgent and dark">
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
    <Spec label="disabled">
      <CollapsiblePanel
        header={<CollapsiblePanel.Header>Header</CollapsiblePanel.Header>}
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
    <Spec label="hideExpansionControls">
      <CollapsiblePanel
        header={<CollapsiblePanel.Header>Header</CollapsiblePanel.Header>}
        description="Some description"
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
  </Suite>
);
