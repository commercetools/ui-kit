import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs/react';
import Section from '../../../../../docs/.storybook/decorators/section';
import Readme from '../../README.md';
import AdditionalInfoMessage from './additional-info-message';

storiesOf('Components|Messages', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('AdditionalInfoMessage', () => (
    <Section>
      <AdditionalInfoMessage>
        {text('children', 'This is an information message')}
      </AdditionalInfoMessage>
    </Section>
  ));
