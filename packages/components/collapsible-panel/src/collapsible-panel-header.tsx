import { ReactNode } from 'react';
import Text from '@commercetools-uikit/text';

type TCollapsiblePanelHeader = {
  children: ReactNode;
};
const CollapsiblePanelHeader = (props: TCollapsiblePanelHeader) => (
  <Text.Subheadline as="h4" isBold={true} truncate={true}>
    {props.children}
  </Text.Subheadline>
);

CollapsiblePanelHeader.displayName = 'CollapsiblePanelHeader';

export default CollapsiblePanelHeader;
