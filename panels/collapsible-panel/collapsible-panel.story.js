import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../.storybook/decorators/section';
import CollapsiblePanel from './collapsible-panel';
import Readme from './README.md';

storiesOf('Panels/CollapsiblePanel', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('Uncontrolled', () => (
    <Section>
      <CollapsiblePanel
        label={text('Label', 'Title')}
        description={text('Description', 'Uncontrolled component example')}
        isSticky={boolean('isSticky', false)}
        isDisabled={boolean('isDisabled', false)}
        tone={select('tone', ['primary', 'urgent'], 'primary')}
      >
        <div>{text('Text', 'Sample text')}</div>
      </CollapsiblePanel>
    </Section>
  ))
  .add('Controlled', () => (
    <Section>
      <CollapsiblePanel
        label={text('Label', 'Title')}
        description={text('Description', 'Controlled component example')}
        isSticky={boolean('isSticky', false)}
        isDisabled={boolean('isDisabled', false)}
        tone={select('tone', ['primary', 'urgent'], 'primary')}
        isClosed={boolean('isClosed', false)}
        onToggle={() => alert('togProps')}
      >
        <div>{text('Text', 'Sample text')}</div>
      </CollapsiblePanel>
    </Section>
  ));
