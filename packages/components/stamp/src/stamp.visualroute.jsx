import { Stamp } from '@commercetools-frontend/ui-kit';
import { ClockIcon } from '@commercetools-uikit/icons';
import { Suite, Spec } from '../../../../test/percy';

export const routePath = '/stamp';

export const component = () => (
  <Suite>
    <Spec label="when critical">
      <Stamp tone="critical">Critical</Stamp>
    </Spec>
    <Spec label="when positive">
      <Stamp tone="positive">Positive</Stamp>
    </Spec>
    <Spec label="when warning">
      <Stamp tone="warning">Warning</Stamp>
    </Spec>
    <Spec label="when information">
      <Stamp tone="information">Information</Stamp>
    </Spec>
    <Spec label="when primary">
      <Stamp tone="primary">Primary</Stamp>
    </Spec>
    <Spec label="when secondary">
      <Stamp tone="secondary">Secondary</Stamp>
    </Spec>
    <Spec label="when condensed">
      <Stamp tone="information" isCondensed={true}>
        Secondary
      </Stamp>
    </Spec>
    <Spec label="when condensed with icon and label">
      <Stamp tone="information" isCondensed={true} label="Hello" icon={<ClockIcon />} />
    </Spec>
    <Spec label="when not condensed with icon and label">
      <Stamp tone="information" isCondensed={false} label="Hello" icon={<ClockIcon />} />
    </Spec>
  </Suite>
);
