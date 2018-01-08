import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../.storybook/decorators/section';
import Readme from './README.md';
import UploadFileButton from './upload-file-button';

storiesOf('Buttons', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('UploadFileButton', () => (
    <Section>
      <UploadFileButton
        isMultiple={boolean('isMultiple', 'false')}
        onChange={action('onChange triggered')}
      >
        {text('children', 'Choose file...')}
      </UploadFileButton>
    </Section>
  ));
