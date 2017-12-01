import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
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
        isClosed={true}
        // onToggle={'onToggle', () => alert('onToggle')}
      >
        <div>
          {text(
            'Text',
            'Sample text <Headline>Sample text <Headline>Sample text <Headline>Sample text <Headline>Sample text <Headline>Sample text <Headline>Sample text <Headline>Sample text <Headline>Sample text <Headline>Sample text <Headline>Sample text <Headline>Sample text <Headline>Sample text <Headline>Sample text <Headline>'
          )}
        </div>
      </CollapsiblePanel>
    </Section>
  ));
