import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../.storybook/decorators/section';
import Collapsible from '../../collapsible';
import CollapsiblePanel from './collapsible-panel';
import Readme from './README.md';

storiesOf('Panels/CollapsiblePanel', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('Uncontrolled', () => (
    <Section>
      <CollapsiblePanel
        header={text('Header', 'Title')}
        description={text('Description', 'Uncontrolled component example')}
        isSticky={boolean('isSticky', false)}
        isDisabled={boolean('isDisabled', false)}
        tone={select('tone', ['primary', 'urgent'], 'primary')}
        headerControls={text('headerControls', 'headerControl')}
        theme={select('theme', ['dark', 'light'])}
        condensed={boolean('condensed', false)}
        secondaryLabel={text('SecondaryLabel', 'Subtitle')}
      >
        <div>{text('Text', 'Sample text')}</div>
      </CollapsiblePanel>
    </Section>
  ))
  .add('Controlled', () => (
    <Section>
      <Collapsible>
        {({ isOpen, toggle }) => (
          <CollapsiblePanel
            header={text('Header', 'Title')}
            description={text('Description', 'Controlled component example')}
            isSticky={boolean('isSticky', false)}
            isDisabled={boolean('isDisabled', false)}
            tone={select('tone', ['primary', 'urgent'], 'primary')}
            isClosed={!isOpen}
            onToggle={toggle}
            headerControls={text('headerControls', 'headerControl')}
            theme={select('theme', ['dark', 'light'])}
            condensed={boolean('condensed', false)}
            secondaryLabel={text('SecondaryLabel', 'Subtitle')}
          >
            <div>{text('Text', 'Sample text')}</div>
          </CollapsiblePanel>
        )}
      </Collapsible>
    </Section>
  ));
