/**
 * Storybook can not handle the current formatting of the text.tsx file.
 * This file was created as a workaround, to allow those components to still
 * be properly parsed and displayed in Storybook.
 */

import Text, {
  TBodyProps,
  TCaptionProps,
  TDetailProps,
  THeadlineProps,
  TSubheadlineProps,
  TWrapProps,
} from './text';

export const HeadlineProxy = (props: THeadlineProps) => (
  <Text.Headline {...props} />
);
HeadlineProxy.displayName = 'Text.Headline';

export const SubheadlineProxy = (props: TSubheadlineProps) => (
  <Text.Subheadline {...props} />
);
SubheadlineProxy.displayName = 'Text.Subheadline';

export const WrapProxy = (props: TWrapProps) => <Text.Wrap {...props} />;
WrapProxy.displayName = 'Text.Wrap';

export const BodyProxy = (props: TBodyProps) => <Text.Body {...props} />;
BodyProxy.displayName = 'Text.Body';

export const DetailProxy = (props: TDetailProps) => <Text.Detail {...props} />;
DetailProxy.displayName = 'Text.Detail';

export const CaptionProxy = (props: TCaptionProps) => (
  <Text.Caption {...props} />
);
CaptionProxy.displayName = 'Text.Caption';
