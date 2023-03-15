import {
  InformationIcon,
  SecondaryIconButton,
} from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../../test/percy';

export const routePath = '/secondary-icon-button';

export const component = () => (
  <Suite>
    <Spec label="regular">
      <SecondaryIconButton
        icon={<InformationIcon />}
        label="A label text"
        onClick={() => {}}
      />
    </Spec>
    <Spec label="disabled">
      <SecondaryIconButton
        icon={<InformationIcon />}
        label="A label text"
        onClick={() => {}}
        isDisabled={true}
      />
    </Spec>
    <Spec label="color - solid">
      <SecondaryIconButton
        icon={<InformationIcon />}
        label="A label text"
        onClick={() => {}}
        color="solid"
      />
    </Spec>
    <Spec label="color - primary">
      <SecondaryIconButton
        icon={<InformationIcon />}
        label="A label text"
        onClick={() => {}}
        color="primary"
      />
    </Spec>
    <Spec label="with small Icon">
      <SecondaryIconButton
        icon={<InformationIcon size="small" />}
        label="A label text"
        onClick={() => {}}
      />
    </Spec>
    <Spec label="sizes when small">
      <SecondaryIconButton
        icon={<InformationIcon />}
        size="small"
        label="A label text"
        onClick={() => {}}
      />
    </Spec>
    <Spec label="sizes when medium">
      <SecondaryIconButton
        icon={<InformationIcon />}
        size="medium"
        label="A label text"
        onClick={() => {}}
      />
    </Spec>
    <Spec label="sizes when big (default)">
      <SecondaryIconButton
        icon={<InformationIcon />}
        size="big"
        label="A label text"
        onClick={() => {}}
      />
    </Spec>
  </Suite>
);
