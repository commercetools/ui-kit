import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  boolean,
  select,
  text,
  number,
} from '@storybook/addon-knobs';
import Section from '../../../../docs/.storybook/decorators/section';
import SpacingsStack from '../../spacings/spacings-stack';
import ProgressBar from './progress-bar';
import Readme from '../README.md';

storiesOf('Components|ProgressBar', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .addDecorator(withKnobs)
  .add('ProgressBar', () => (
    <Section>
      <SpacingsStack>
        <ProgressBar
          label={text('label', '50% completed')}
          progress={number('Progress', 50, {
            range: true,
            min: 0,
            max: 100,
            step: 1,
          })}
          isAnimated={boolean('isAnimated', true)}
          isInverted={boolean('isInverted', false)}
          labelPosition={select(
            'labelPosition',
            ['left', 'right', 'top', 'bottom'],
            'top'
          )}
          height={select('height', ['10', '20'], '20')}
          labelWidth={select(
            'labelWidth',
            ['auto', 'scale', 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
            6
          )}
          barWidth={select(
            'barWidth',
            ['auto', 'scale', 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
            6
          )}
        />
      </SpacingsStack>
    </Section>
  ));
