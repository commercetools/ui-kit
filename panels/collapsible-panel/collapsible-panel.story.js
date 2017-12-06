import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../.storybook/decorators/section';
import CollapsiblePanel from './collapsible-panel';
import Readme from './README.md';

storiesOf('Panels', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('Collapsible', () => (
    <Section>
      <CollapsiblePanel
        label={text('Label', 'Title')}
        description={text('Description', 'Description')}
        isSticky={boolean('isSticky', false)}
        isDisabled={boolean('isDisabled', false)}
        tone={select('tone', ['primary', 'urgent'], 'primary')}
        isClosed={boolean('isClosed', false)}
        // onToggle={'onToggle', () => alert('onToggle')}
      >
        <div>{text('Text', 'Sample text')}</div>
      </CollapsiblePanel>
    </Section>
  ));
