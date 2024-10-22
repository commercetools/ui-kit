import {
  InformationIcon,
  SecondaryButton,
} from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../../test/percy';

export const routePath = '/secondary-button';

export const component = () => (
  <Suite>
    <Spec label="regular">
      <SecondaryButton label="A label text" onClick={() => {}} />
    </Spec>

    <Spec label="disabled">
      <SecondaryButton
        label="A label text"
        onClick={() => {}}
        isDisabled={true}
      />
    </Spec>

    <Spec label="with icon left (default)">
      <SecondaryButton
        label="A label text"
        onClick={() => {}}
        iconLeft={<InformationIcon />}
      />
    </Spec>

    <Spec label="as toggle button - when not toggled">
      <SecondaryButton
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
      />
    </Spec>

    <Spec label="as toggle button - when toggled">
      <SecondaryButton
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
        isToggled={true}
      />
    </Spec>

    <Spec label='with theme - when toggled with tone "default"'>
      <SecondaryButton
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
        isToggled={true}
        tone="default"
      />
    </Spec>

    <Spec label='with theme - when toggled with tone "info"'>
      <SecondaryButton
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
        isToggled={true}
        tone="info"
      />
    </Spec>

    <Spec label='with theme - when not toggled with tone "default"'>
      <SecondaryButton
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
        isToggled={false}
        tone="default"
      />
    </Spec>

    <Spec label='with theme - when not toggled with tone "info"'>
      <SecondaryButton
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
        isToggled={false}
        tone="info"
      />
    </Spec>

    <Spec label='size - when "big"'>
      <SecondaryButton label="A label text" onClick={() => {}} size="big" />
    </Spec>

    <Spec label='size - when "medium"'>
      <SecondaryButton label="A label text" onClick={() => {}} size="medium" />
    </Spec>

    <Spec label='size - when "20"'>
      <SecondaryButton label="A label text" onClick={() => {}} size="20" />
    </Spec>

    <Spec label='size - when "10"'>
      <SecondaryButton label="A label text" onClick={() => {}} size="10" />
    </Spec>

    <Spec label="when used as link">
      <SecondaryButton label="A label text" to="/" />
    </Spec>

    <Spec label='when tone is "info"'>
      <SecondaryButton label="A label text" onClick={() => {}} tone="info" />
    </Spec>

    <Spec label="with icon right">
      <SecondaryButton
        label="A label text"
        onClick={() => {}}
        iconRight={<InformationIcon />}
      />
    </Spec>
    <Spec label="with icon left + right">
      <SecondaryButton
        label="A label text"
        onClick={() => {}}
        iconLeft={<InformationIcon />}
        iconRight={<InformationIcon />}
      />
    </Spec>
  </Suite>
);
