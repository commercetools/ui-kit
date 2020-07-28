import React from 'react';
import { storiesOf } from '@storybook/react';
import Section from '../../../../.storybook/decorators/section';
import Text from '../../text';
import Spacings from '../../spacings';
import * as icons from '../../icons';
import Stamp, { availableTones } from './stamp';
import Readme from '../README.md';

const iconNames = Object.keys(icons);
const numberOfIcons = iconNames.length;
const getRandomIndex = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

storiesOf('Components|Stamps', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('Stamp', () => (
    <Section>
      <Spacings.Stack>
        {availableTones.map((tone) => {
          const iconIndex = getRandomIndex(0, numberOfIcons);
          const Icon = icons[iconNames[iconIndex]];
          return (
            <Spacings.Inline key={tone} alignItems="center">
              <Stamp tone={tone}>
                <Spacings.Inline alignItems="center">
                  <Icon size="medium" />
                  <Text.Detail>{'Hello'}</Text.Detail>
                </Spacings.Inline>
              </Stamp>
              <Stamp tone={tone}>
                <Text.Detail>{`tone="${tone}"`}</Text.Detail>
              </Stamp>
            </Spacings.Inline>
          );
        })}
      </Spacings.Stack>
    </Section>
  ));
