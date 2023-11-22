import { InformationIcon, PrimaryButton } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../../test/percy';

export const routePath = '/primary-button';

export const component = () => (
  <Suite>
    <Spec label="regular">
      <PrimaryButton label="A label text" onClick={() => {}} />
    </Spec>

    <Spec label="disabled">
      <PrimaryButton
        label="A label text"
        onClick={() => {}}
        isDisabled={true}
      />
    </Spec>

    <Spec label="with icon left (default)">
      <PrimaryButton
        label="A label text"
        onClick={() => {}}
        iconLeft={<InformationIcon />}
      />
    </Spec>

    <Spec label="as toggle button - when not toggled">
      <PrimaryButton
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
      />
    </Spec>

    <Spec label="as toggle button - when toggled">
      <PrimaryButton
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
        isToggled={true}
      />
    </Spec>

    <Spec label='size - when "big"'>
      <PrimaryButton label="A label text" onClick={() => {}} size="big" />
    </Spec>

    <Spec label='size - when "medium"'>
      <PrimaryButton label="A label text" onClick={() => {}} size="medium" />
    </Spec>

    <Spec label='tone - when "urgent"'>
      <PrimaryButton label="A label text" onClick={() => {}} tone="urgent" />
    </Spec>

    <Spec label='tone - when "primary"'>
      <PrimaryButton label="A label text" onClick={() => {}} tone="primary" />
    </Spec>

    <Spec label='tone - when "critical"'>
      <PrimaryButton label="A label text" onClick={() => {}} tone="critical" />
    </Spec>

    <Spec label="as toggle button - when toggled and disabled">
      <PrimaryButton
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
        isToggled={true}
        isDisabled={true}
      />
    </Spec>

    <Spec label="as toggle button (urgent tone) - when not toggled">
      <PrimaryButton
        label="A label text"
        onClick={() => {}}
        tone="urgent"
        isToggleButton={true}
      />
    </Spec>

    <Spec label="as toggle button (urgent tone) - when toggled">
      <PrimaryButton
        label="A label text"
        onClick={() => {}}
        tone="urgent"
        isToggleButton={true}
        isToggled={true}
      />
    </Spec>

    <Spec label="as toggle button (urgent tone) - when toggled and disabled">
      <PrimaryButton
        label="A label text"
        onClick={() => {}}
        tone="urgent"
        isToggleButton={true}
        isToggled={true}
        isDisabled={true}
      />
    </Spec>

    <Spec label="as toggle button (critical tone) - when toggled and disabled">
      <PrimaryButton
        label="A label text"
        onClick={() => {}}
        tone="critical"
        isToggleButton={true}
        isToggled={true}
        isDisabled={true}
      />
    </Spec>
    
    <Spec label="with `as` as Link - regular">
      <PrimaryButton
        as="a"
        href="https://kanyetothe.com"
        label="A label text"
        onClick={() => {}}
      />
    </Spec>

    <Spec label="with `as` as Link - disabled">
      <PrimaryButton
        as="a"
        href="https://kanyetothe.com"
        label="A label text"
        onClick={() => {}}
        isDisabled={true}
      />
    </Spec>

    <Spec label="with `as` as Link - with icon left (default)">
      <PrimaryButton
        as="a"
        href="https://kanyetothe.com"
        label="A label text"
        onClick={() => {}}
        iconLeft={<InformationIcon />}
      />
    </Spec>

    <Spec label="with `as` as Link - as toggle button - when not toggled">
      <PrimaryButton
        as="a"
        href="https://kanyetothe.com"
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
      />
    </Spec>

    <Spec label="with `as` as Link - as toggle button - when toggled">
      <PrimaryButton
        as="a"
        href="https://kanyetothe.com"
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
        isToggled={true}
      />
    </Spec>

    <Spec label='size - when "big"'>
      <PrimaryButton
        as="a"
        href="https://kanyetothe.com"
        label="A label text"
        onClick={() => {}}
        size="big"
      />
    </Spec>

    <Spec label='size - when "medium"'>
      <PrimaryButton
        as="a"
        href="https://kanyetothe.com"
        label="A label text"
        onClick={() => {}}
        size="medium"
      />
    </Spec>

    <Spec label='tone - when "urgent"'>
      <PrimaryButton
        as="a"
        href="https://kanyetothe.com"
        label="A label text"
        onClick={() => {}}
        tone="urgent"
      />
    </Spec>

    <Spec label='tone - when "primary"'>
      <PrimaryButton
        as="a"
        href="https://kanyetothe.com"
        label="A label text"
        onClick={() => {}}
        tone="primary"
      />
    </Spec>

    <Spec label='tone - when "critical"'>
      <PrimaryButton
        as="a"
        href="https://kanyetothe.com"
        label="A label text"
        onClick={() => {}}
        tone="critical"
      />
    </Spec>

    <Spec label="with `as` as Link - as toggle button - when toggled and disabled">
      <PrimaryButton
        as="a"
        href="https://kanyetothe.com"
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
        isToggled={true}
        isDisabled={true}
      />
    </Spec>

    <Spec label="with `as` as Link - as toggle button (urgent tone) - when not toggled">
      <PrimaryButton
        as="a"
        href="https://kanyetothe.com"
        label="A label text"
        onClick={() => {}}
        tone="urgent"
        isToggleButton={true}
      />
    </Spec>

    <Spec label="with `as` as Link - as toggle button (urgent tone) - when toggled">
      <PrimaryButton
        as="a"
        href="https://kanyetothe.com"
        label="A label text"
        onClick={() => {}}
        tone="urgent"
        isToggleButton={true}
        isToggled={true}
      />
    </Spec>

    <Spec label="with `as` as Link - as toggle button (urgent tone) - when toggled and disabled">
      <PrimaryButton
        as="a"
        href="https://kanyetothe.com"
        label="A label text"
        onClick={() => {}}
        tone="urgent"
        isToggleButton={true}
        isToggled={true}
        isDisabled={true}
      />
    </Spec>
  </Suite>
);
