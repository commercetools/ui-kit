import React from 'react';
import { RadioInput } from 'ui-kit';
import { Suite, Spec } from '../../../../test/percy';

export const routePath = '/radio-input';

export const component = () => (
  <Suite>
    <Spec label="when direction is stack">
      <RadioInput.Group
        name="uikit-group"
        value={'apples'}
        onChange={() => {}}
        direction={'stack'}
      >
        <RadioInput.Option value="apples">Apples</RadioInput.Option>
        <RadioInput.Option isChecked={true} value="oranges">
          Oranges
        </RadioInput.Option>
        <RadioInput.Option isDisabled={true} value="kiwis">
          Kiwis (disabled)
        </RadioInput.Option>
        <RadioInput.Option isHovered={true} value="plums">
          Plums (hovered)
        </RadioInput.Option>
      </RadioInput.Group>
    </Spec>
    <Spec label="when direction is inline">
      <RadioInput.Group
        name="uikit-group"
        value={'oranges'}
        onChange={() => {}}
        direction={'inline'}
      >
        <RadioInput.Option value="apples">Apples</RadioInput.Option>
        <RadioInput.Option isChecked={true} value="oranges">
          Oranges
        </RadioInput.Option>
      </RadioInput.Group>
    </Spec>
  </Suite>
);
