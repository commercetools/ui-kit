import React from 'react';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';

const Example = () => (
  <Spacings.Stack>
    {/* 1. Uncontrolled. The `CollapsiblePanel` controls its own state. You do not pass handlers or state related props. */}
    <CollapsiblePanel header="Lorem">
      <Text.Detail>Hello World</Text.Detail>
    </CollapsiblePanel>
    ;
    {/* 2. Controlled. You control the `CollapsiblePanel`. You do pass handlers or state related props.
    Assume the parent rendering the `CollapsiblePanel` has `isPanelOpen` as state and a `togglePanel` as a handler. */}
    <CollapsiblePanel
      isClosed={this.state.isPanelOpen}
      onToggle={this.togglePanel}
      header="Lorem"
    >
      <Text.Detail>Hello World</Text.Detail>
    </CollapsiblePanel>
    ;
  </Spacings.Stack>
);

export default Example;
