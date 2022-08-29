import { Label } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../test/percy';

export const routePath = '/label';

const intlMessage = { id: 'input-label', defaultMessage: 'Hello' };

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <Label>Hello</Label>
    </Spec>
    <Spec label="when bold">
      <Label isBold={true}>Hello</Label>
    </Spec>
    <Spec label="with required indicator">
      <Label isBold={true} isRequiredIndicatorVisible={true}>
        Hello
      </Label>
    </Spec>
    <Spec label="intlMessage">
      <Label intlMessage={intlMessage} />
    </Spec>
  </Suite>
);
