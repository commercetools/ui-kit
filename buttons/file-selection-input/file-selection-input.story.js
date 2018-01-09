import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../.storybook/decorators/section';
import Readme from './README.md';
import FileSelectionInput from './file-selection-input';

storiesOf('Buttons', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('FileSelectionInput', () => (
    <Section>
      <FileSelectionInput
        allowMultiple={boolean('allowMultiple', 'false')}
        name={text('name', 'input-file')}
        acceptTypes={text('acceptTypes', 'image/png,image/jpeg,image/gif')}
        onChange={action('onChange triggered')}
      >
        {text('children', 'Choose file...')}
      </FileSelectionInput>
    </Section>
  ));
