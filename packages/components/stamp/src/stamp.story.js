import { storiesOf } from '@storybook/react';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import Section from '../../../../docs/.storybook/decorators/section';
import Text from '../../text';
import SpacingsStack from '../../spacings/spacings-stack';
import SpacingsInline from '../../spacings/spacings-inline';
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
  .addDecorator(withKnobs)
  .add('Stamp', () => (
    <Section>
      <SpacingsStack>
        {availableTones.map((tone) => {
          const iconIndex = getRandomIndex(0, numberOfIcons);
          const Icon = icons[iconNames[iconIndex]];
          return (
            <SpacingsInline key={tone} alignItems="center">
              <Stamp tone={tone} isCondensed={boolean('isCondensed', false)}>
                <SpacingsInline alignItems="center">
                  <Icon size="medium" />
                  <Text.Detail tone={tone}>{'Hello'}</Text.Detail>
                </SpacingsInline>
              </Stamp>
              <Stamp tone={tone} isCondensed={boolean('isCondensed', false)}>
                <Text.Detail tone={tone}>{`tone="${tone}"`}</Text.Detail>
              </Stamp>
            </SpacingsInline>
          );
        })}
      </SpacingsStack>
    </Section>
  ));
