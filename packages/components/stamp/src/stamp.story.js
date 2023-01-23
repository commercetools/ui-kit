// TODO: @redesign cleanup
import { storiesOf } from '@storybook/react';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import Section from '../../../../docs/.storybook/decorators/section';
import Text from '../../text';
import SpacingsStack from '../../spacings/spacings-stack';
import SpacingsInline from '../../spacings/spacings-inline';
import * as icons from '../../icons';
import Stamp, { availableTones } from './stamp';
import Readme from '../README.md';
import { useTheme } from '@commercetools-uikit/design-system';

const iconNames = Object.keys(icons);
const numberOfIcons = iconNames.length;
const getRandomIndex = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const iconColorsMap = {
  secondary: 'neutral60',
  primary: 'primary40',
  information: 'info',
  positive: 'primary',
  warning: 'warning',
  critical: 'error',
};
storiesOf('Components|Stamps', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .addDecorator(withKnobs)
  .add('Stamp', () => {
    const { themedValue } = useTheme();
    return (
      <Section>
        <SpacingsStack>
          {availableTones.map((tone) => {
            const iconIndex = getRandomIndex(0, numberOfIcons);
            const Icon = icons[iconNames[iconIndex]];
            return (
              <SpacingsInline key={tone} alignItems="center">
                <Stamp
                  tone={tone}
                  isCondensed={boolean('isCondensed', false)}
                  icon={
                    <Icon
                      color={themedValue(undefined, iconColorsMap[tone])}
                      size="medium"
                    />
                  }
                  message={{ id: tone, defaultMessage: 'Hello' }}
                />
                <Stamp
                  tone={tone}
                  isCondensed={boolean('isCondensed', false)}
                  message={{ id: tone, defaultMessage: tone }}
                  icon={<Icon />}
                />
              </SpacingsInline>
            );
          })}
        </SpacingsStack>
      </Section>
    );
  });
