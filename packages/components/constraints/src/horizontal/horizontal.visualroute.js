import React from 'react';
import styled from '@emotion/styled';
import { Constraints } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../../test/percy';

const GreenBox = styled.div`
  width: 100%;
  height: 20px;
  background-color: green;
`;

export const routePath = '/constraints-horizontal';

export const component = () => (
  <Suite>
    <Spec label="when `constraint` is 1">
      <Constraints.Horizontal constraint={1}>
        <GreenBox />
      </Constraints.Horizontal>
    </Spec>
    <Spec label="when `constraint` is 3">
      <Constraints.Horizontal constraint={3}>
        <GreenBox />
      </Constraints.Horizontal>
    </Spec>
    <Spec label="when `constraint` is 7">
      <Constraints.Horizontal constraint={7}>
        <GreenBox />
      </Constraints.Horizontal>
    </Spec>
    <Spec label="when `constraint` is 10">
      <Constraints.Horizontal constraint={10}>
        <GreenBox />
      </Constraints.Horizontal>
    </Spec>
    <Spec label="when `constraint` is 16">
      <Constraints.Horizontal constraint={16}>
        <GreenBox />
      </Constraints.Horizontal>
    </Spec>
    <Spec label='when `constraint` is "scale"'>
      <Constraints.Horizontal constraint="scale">
        <GreenBox />
      </Constraints.Horizontal>
    </Spec>
    <Spec label="when max is 1">
      <Constraints.Horizontal max={1}>
        <GreenBox />
      </Constraints.Horizontal>
    </Spec>
    <Spec label="when max is 2">
      <Constraints.Horizontal max={2}>
        <GreenBox />
      </Constraints.Horizontal>
    </Spec>
    <Spec label="when max is 3">
      <Constraints.Horizontal max={3}>
        <GreenBox />
      </Constraints.Horizontal>
    </Spec>
    <Spec label="when max is 4">
      <Constraints.Horizontal max={4}>
        <GreenBox />
      </Constraints.Horizontal>
    </Spec>
    <Spec label="when max is 5">
      <Constraints.Horizontal max={5}>
        <GreenBox />
      </Constraints.Horizontal>
    </Spec>
    <Spec label="when max is 6">
      <Constraints.Horizontal max={6}>
        <GreenBox />
      </Constraints.Horizontal>
    </Spec>
    <Spec label="when max is 7">
      <Constraints.Horizontal max={7}>
        <GreenBox />
      </Constraints.Horizontal>
    </Spec>
    <Spec label="when max is 8">
      <Constraints.Horizontal max={8}>
        <GreenBox />
      </Constraints.Horizontal>
    </Spec>
    <Spec label="when max is 9">
      <Constraints.Horizontal max={9}>
        <GreenBox />
      </Constraints.Horizontal>
    </Spec>
    <Spec label="when max is 10">
      <Constraints.Horizontal max={10}>
        <GreenBox />
      </Constraints.Horizontal>
    </Spec>
    <Spec label="when max is 11">
      <Constraints.Horizontal max={11}>
        <GreenBox />
      </Constraints.Horizontal>
    </Spec>
    <Spec label="when max is 12">
      <Constraints.Horizontal max={12}>
        <GreenBox />
      </Constraints.Horizontal>
    </Spec>
    <Spec label="when max is 13">
      <Constraints.Horizontal max={13}>
        <GreenBox />
      </Constraints.Horizontal>
    </Spec>
    <Spec label="when max is 14">
      <Constraints.Horizontal max={14}>
        <GreenBox />
      </Constraints.Horizontal>
    </Spec>
    <Spec label="when max is 15">
      <Constraints.Horizontal max={15}>
        <GreenBox />
      </Constraints.Horizontal>
    </Spec>
    <Spec label="when max is 16">
      <Constraints.Horizontal max={16}>
        <GreenBox />
      </Constraints.Horizontal>
    </Spec>
    <Spec label='when max is "scale"'>
      <Constraints.Horizontal max="scale">
        <GreenBox />
      </Constraints.Horizontal>
    </Spec>
    <Spec label='when max is "auto"'>
      <Constraints.Horizontal max="auto">
        <GreenBox />
      </Constraints.Horizontal>
    </Spec>
  </Suite>
);
