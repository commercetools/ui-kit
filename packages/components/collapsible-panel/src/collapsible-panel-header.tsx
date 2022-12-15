// TODO: @redesign cleanup
import { ReactNode } from 'react';
import { useTheme } from '@commercetools-uikit/design-system';
import Text from '@commercetools-uikit/text';

type TCollapsiblePanelHeader = {
  children: ReactNode;
};
const CollapsiblePanelHeader = (props: TCollapsiblePanelHeader) => {
  const { isNewTheme } = useTheme();

  if (isNewTheme) {
    return (
      <Text.Headline as="h2" truncate={true}>
        {props.children}
      </Text.Headline>
    );
  }

  return (
    <Text.Subheadline as="h4" isBold={true} truncate={true}>
      {props.children}
    </Text.Subheadline>
  );
};

CollapsiblePanelHeader.displayName = 'CollapsiblePanelHeader';

export default CollapsiblePanelHeader;
