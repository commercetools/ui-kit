import React from 'react';
import Text from '@commercetools-uikit/text';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import * as icons from '@commercetools-uikit/icons';
import { Stamp } from '../src';
import { availableTones } from '../src/stamp';

const iconNames = Object.keys(icons);
const numberOfIcons = iconNames.length;
const getRandomIndex = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export default {
  title: 'Components/Stamp',
  component: Stamp,
};

const Template = (args) => (
  <SpacingsStack>
    {availableTones.map((tone) => {
      const iconIndex = getRandomIndex(0, numberOfIcons);
      const Icon = icons[iconNames[iconIndex]];
      return (
        <SpacingsInline key={tone} alignItems="center">
          <Stamp {...args} tone={tone}>
            <SpacingsInline alignItems="center">
              <Icon size="medium" />
              <Text.Detail>{'Hello'}</Text.Detail>
            </SpacingsInline>
          </Stamp>
          <Stamp {...args} tone={tone}>
            <Text.Detail>{`tone="${tone}"`}</Text.Detail>
          </Stamp>
        </SpacingsInline>
      );
    })}
  </SpacingsStack>
);

export const Default = Template.bind({});
Default.args = {};
export const Condensed = Template.bind({});
Condensed.args = {
  isCondensed: true,
};
