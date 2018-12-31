import React from 'react';
import { Radio } from 'ui-kit';
import { Suite, Spec } from '../../../../test/percy';

export const routePath = '/radio';

export const component = () => (
  <Suite>
    <Spec label="when direction is stack">
      <Radio.Group
        name="uikit-group"
        value={'apples'}
        onChange={() => {}}
        direction={'stack'}
      >
        <Radio.Option value="apples">Apples</Radio.Option>
        <Radio.Option isChecked={true} value="oranges">
          Oranges
        </Radio.Option>
        <Radio.Option isDisabled={true} value="kiwis">
          Kiwis (disabled)
        </Radio.Option>
        <Radio.Option isHovered={true} value="plums">
          Plums (hovered)
        </Radio.Option>
      </Radio.Group>
    </Spec>
    <Spec label="when direction is inline">
      <Radio.Group
        name="uikit-group"
        value={'oranges'}
        onChange={() => {}}
        direction={'inline'}
      >
        <Radio.Option value="apples">Apples</Radio.Option>
        <Radio.Option isChecked={true} value="oranges">
          Oranges
        </Radio.Option>
      </Radio.Group>
    </Spec>
  </Suite>
);
