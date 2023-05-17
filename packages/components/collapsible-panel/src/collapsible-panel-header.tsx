import { ReactNode } from 'react';
import Text from '@commercetools-uikit/text';

type TCollapsiblePanelHeader = {
  children: ReactNode;
};
const CollapsiblePanelHeader = (props: TCollapsiblePanelHeader) => (
  <Text.Headline as="h2" truncate={true}>
    {props.children}
  </Text.Headline>
);

CollapsiblePanelHeader.displayName = 'CollapsiblePanelHeader';

export default CollapsiblePanelHeader;
