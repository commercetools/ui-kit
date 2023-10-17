import { Label } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../test/percy';

export const routePath = '/label';

const intlMessage = { id: 'input-label', defaultMessage: 'Hello' };

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <Label>Hello</Label>
    </Spec>
    <Spec label="when fontWeight medium">
      <Label fontWeight="medium">Hello</Label>
    </Spec>
    <Spec label="when fontWeight bold">
      <Label fontWeight="bold">Hello</Label>
    </Spec>
    <Spec label="with required indicator">
      <Label isRequiredIndicatorVisible={true}>Hello</Label>
    </Spec>
    <Spec label="intlMessage">
      <Label intlMessage={intlMessage} />
    </Spec>
  </Suite>
);
