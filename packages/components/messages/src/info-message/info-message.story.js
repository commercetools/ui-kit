import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs/react';
import Section from '../../../../../docs/.storybook/decorators/section';
import Readme from '../../README.md';
import InfoMessage from './info-message';

storiesOf('Components|Messages', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('InfoMessage', () => (
    <Section>
      <InfoMessage>
        {text('children', 'This is an information message')}
      </InfoMessage>
    </Section>
  ));
