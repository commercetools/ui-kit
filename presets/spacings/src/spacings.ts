import Inline from '@commercetools-uikit/spacings-inline';
import Inset from '@commercetools-uikit/spacings-inset';
import InsetSquish from '@commercetools-uikit/spacings-inset-squish';
import Stack from '@commercetools-uikit/spacings-stack';

export type TSpacings = {
  Inline: typeof Inline;
  Inset: typeof Inset;
  InsetSquish: typeof InsetSquish;
  Stack: typeof Stack;
};
const Spacings: TSpacings = { Inline, Inset, InsetSquish, Stack };

export default Spacings;
