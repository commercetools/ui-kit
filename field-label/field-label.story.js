import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import * as icons from '../icons';
import FlatButton from '../buttons/flat-button';
import Section from '../.storybook/decorators/section';
import Readme from './README.md';
import FieldLabel from './field-label';

storiesOf('FieldLabel', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('FieldLabel', () => {
    const hint = text('hint', '');

    // hintIcon will only render when hint exists
    const iconNames = Object.keys(icons);
    const icon = select('hintIcon', ['', ...iconNames], '');
    const hintIcon = icon ? React.createElement(icons[icon]) : undefined;
    return (
      <Section>
        <FieldLabel
          horizontalConstraint={select(
            'horizontalConstraint',
            ['xs', 's', 'm', 'l', 'xl', 'scale'],
            'scale'
          )}
          title={text('title', 'Label title example')}
          hasRequiredIndicator={boolean('hasRequiredIndicator', false)}
          onInfoButtonClick={
            boolean('show info button', false)
              ? action('onInfoButtonClick')
              : undefined
          }
          hint={hint}
          hintIcon={hintIcon}
          description={text('description', '')}
          badge={
            boolean('show badge', false) ? (
              <FlatButton
                tone="primary"
                icon={<icons.BoxIcon />}
                label="show"
                onClick={() => {}}
              />
            ) : (
              undefined
            )
          }
        />
      </Section>
    );
  });
