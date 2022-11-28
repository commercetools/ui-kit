import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import Section from '../../../../../docs/.storybook/decorators/section';
import Readme from '../../README.md';
import WarningMessage from './warning-message';

storiesOf('Components|Messages', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('WarningMessage', () => (
    <Section>
      <WarningMessage>
        {text('children', 'This name is already being used by another variant')}
      </WarningMessage>
    </Section>
  ));
