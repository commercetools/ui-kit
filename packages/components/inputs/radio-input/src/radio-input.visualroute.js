import React from 'react';
import styled from '@emotion/styled';
import { RadioInput } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../../test/percy';

const GreenBox = styled.div`
  width: 100%;
  height: 20px;
  background-color: green;
`;

export const routePath = '/radio-input';

export const component = () => (
  <Suite>
    <Spec label="when direction is stack">
      <RadioInput.Group
        name="fruits"
        value="apples"
        onChange={() => {}}
        direction="stack"
      >
        <RadioInput.Option value="apples">{'Apples'}</RadioInput.Option>
        <RadioInput.Option value="oranges">{'Oranges'}</RadioInput.Option>
      </RadioInput.Group>
    </Spec>
    <Spec label="when direction is stack (disabled)">
      <RadioInput.Group
        name="fruits"
        value="apples"
        onChange={() => {}}
        direction="stack"
        isDisabled={true}
      >
        <RadioInput.Option value="apples">{'Apples'}</RadioInput.Option>
        <RadioInput.Option value="oranges">{'Oranges'}</RadioInput.Option>
      </RadioInput.Group>
    </Spec>
    <Spec label="when direction is stack (only one option disabled)">
      <RadioInput.Group
        name="fruits"
        value="apples"
        onChange={() => {}}
        direction="stack"
      >
        <RadioInput.Option value="apples">{'Apples'}</RadioInput.Option>
        <RadioInput.Option value="oranges" isDisabled={true}>
          {'Oranges'}
        </RadioInput.Option>
      </RadioInput.Group>
    </Spec>
    <Spec label="when direction is stack (only one option in hovered state)">
      <RadioInput.Group
        name="fruits"
        value="apples"
        onChange={() => {}}
        direction="stack"
      >
        <RadioInput.Option value="apples">{'Apples'}</RadioInput.Option>
        <RadioInput.Option value="oranges" isHovered={true}>
          {'Oranges'}
        </RadioInput.Option>
      </RadioInput.Group>
    </Spec>
    <Spec label="when direction is stack (has errors)">
      <RadioInput.Group
        name="fruits"
        value="apples"
        onChange={() => {}}
        direction="stack"
        hasError={true}
      >
        <RadioInput.Option value="apples">{'Apples'}</RadioInput.Option>
        <RadioInput.Option value="oranges">{'Oranges'}</RadioInput.Option>
      </RadioInput.Group>
    </Spec>
    <Spec label="when direction is stack (has warning)">
      <RadioInput.Group
        name="fruits"
        value="apples"
        onChange={() => {}}
        direction="stack"
        hasWarning={true}
      >
        <RadioInput.Option value="apples">{'Apples'}</RadioInput.Option>
        <RadioInput.Option value="oranges">{'Oranges'}</RadioInput.Option>
      </RadioInput.Group>
    </Spec>
    <Spec label="when direction is stack (constraint m)">
      <RadioInput.Group
        name="fruits"
        value="apples"
        onChange={() => {}}
        direction="stack"
        horizontalConstraint="m"
      >
        <RadioInput.Option value="apples">
          <GreenBox />
        </RadioInput.Option>
      </RadioInput.Group>
    </Spec>
    <Spec label="when direction is stack (constraint l)">
      <RadioInput.Group
        name="fruits"
        value="apples"
        onChange={() => {}}
        direction="stack"
        horizontalConstraint="l"
      >
        <RadioInput.Option value="apples">
          <GreenBox />
        </RadioInput.Option>
      </RadioInput.Group>
    </Spec>
    <Spec label="when direction is stack (constraint xl)">
      <RadioInput.Group
        name="fruits"
        value="apples"
        onChange={() => {}}
        direction="stack"
        horizontalConstraint="xl"
      >
        <RadioInput.Option value="apples">
          <GreenBox />
        </RadioInput.Option>
      </RadioInput.Group>
    </Spec>
    <Spec label="when direction is stack (constraint scale)">
      <RadioInput.Group
        name="fruits"
        value="apples"
        onChange={() => {}}
        direction="stack"
        horizontalConstraint="scale"
      >
        <RadioInput.Option value="apples">
          <GreenBox />
        </RadioInput.Option>
      </RadioInput.Group>
    </Spec>
    <Spec label="when direction is inline">
      <RadioInput.Group
        name="fruits"
        value="apples"
        onChange={() => {}}
        direction="inline"
      >
        <RadioInput.Option value="apples">{'Apples'}</RadioInput.Option>
        <RadioInput.Option value="oranges">{'Oranges'}</RadioInput.Option>
      </RadioInput.Group>
    </Spec>
  </Suite>
);
