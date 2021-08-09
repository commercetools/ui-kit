import { storiesOf } from '@storybook/react';
import { withKnobs, select, text } from '@storybook/addon-knobs/react';
import Section from '../../../../docs/.storybook/decorators/section';
import Readme from '../README.md';
import LoadingSpinner from './loading-spinner';

storiesOf('Components|Loading', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('LoadingSpinner', () => (
    <Section>
      <LoadingSpinner scale={select('scale', ['l', 's'])}>
        {text('children', 'Loading text')}
      </LoadingSpinner>
    </Section>
  ));
