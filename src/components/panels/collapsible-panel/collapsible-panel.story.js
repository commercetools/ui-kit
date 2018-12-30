import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../../../.storybook/decorators/section';
import CollapsiblePanel from './collapsible-panel';
import CollapsiblePanelHeader from './collapsible-panel-header';
import Readme from './README.md';

storiesOf('Components|Panels', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('CollapsiblePanel', () => {
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
          description={text('description', 'Description')}
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
  });
