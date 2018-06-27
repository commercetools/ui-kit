import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../.storybook/decorators/section';
import Collapsible from '../../collapsible';
import CollapsiblePanel from './collapsible-panel';
import CollapsiblePanelHeader from './collapsible-panel-header';
import Readme from './README.md';

storiesOf('Panels/CollapsiblePanel', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('Uncontrolled', () => {
    const condensed = boolean('condensed', false);
    return (
      <Section>
        <CollapsiblePanel
          header={
            condensed ? (
              text('header', 'Header')
            ) : (
              <CollapsiblePanelHeader>
                {text('header', 'Header')}
              </CollapsiblePanelHeader>
            )
          }
          description={text('description', 'Uncontrolled component example')}
          isSticky={boolean('isSticky', false)}
          isDisabled={boolean('isDisabled', false)}
          tone={select('tone', ['primary', 'urgent'], 'primary')}
          headerControls={text('headerControls', 'headerControl')}
          theme={select('theme', ['dark', 'light'])}
          condensed={condensed}
          secondaryHeader={text('secondaryHeader', 'Subtitle')}
        >
          {text('Text', 'Sample text')}
        </CollapsiblePanel>
      </Section>
    );
  })
  .add('Controlled', () => (
    <Section>
      <Collapsible>
        {({ isOpen, toggle }) => {
          const condensed = boolean('consensed', false);
          return (
            <CollapsiblePanel
              header={
                condensed ? (
                  text('header', 'Header')
                ) : (
                  <CollapsiblePanelHeader>
                    {text('header', 'Header')}
                  </CollapsiblePanelHeader>
                )
              }
              description={text('description', 'Controlled component example')}
              isSticky={boolean('isSticky', false)}
              isDisabled={boolean('isDisabled', false)}
              tone={select('tone', ['primary', 'urgent'], 'primary')}
              isClosed={!isOpen}
              onToggle={toggle}
              headerControls={text('headerControls', 'headerControl')}
              theme={select('theme', ['dark', 'light'])}
              condensed={condensed}
              secondaryHeader={text('secondaryHeader', 'Subtitle')}
            >
              {text('Text', 'Sample text')}
            </CollapsiblePanel>
          );
        }}
      </Collapsible>
    </Section>
  ));
