import React from 'react';
import { storiesOf } from '@storybook/react';
import withReadme from 'storybook-readme/with-readme';
import Section from '../.storybook/decorators/section';
import Text from '../typography/text';
import Spacings from '../materials/spacings';
import * as icons from '../icons';
import Label, { availableTones } from './label';
import Readme from './README.md';

const iconNames = Object.keys(icons);
const numberOfIcons = iconNames.length;
const getRandomIndex = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

storiesOf('Labels', module)
  .addDecorator(withReadme(Readme))
  .add('Label', () => (
    <Section>
      <Spacings.Stack>
        {availableTones.map(tone => {
          const iconIndex = getRandomIndex(0, numberOfIcons);
          const Icon = icons[iconNames[iconIndex]];
          return (
            <Spacings.Inline key={tone} alignItems="center">
              <Label tone={tone}>
                <Spacings.Inline alignItems="center">
                  <Icon size="small" />
                  <Text.Detail>{'Hello'}</Text.Detail>
                </Spacings.Inline>
              </Label>
              <Label tone={tone}>
                <Text.Detail>{`tone="${tone}"`}</Text.Detail>
              </Label>
            </Spacings.Inline>
          );
        })}
      </Spacings.Stack>
    </Section>
  ));
