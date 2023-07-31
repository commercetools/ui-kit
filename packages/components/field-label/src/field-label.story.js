import { createElement } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs/react';
import Constraints from '../../constraints';
import FlatButton from '../../buttons/flat-button';
import * as icons from '../../icons';
import Section from '../../../../docs/.storybook/decorators/section';
import Readme from '../README.md';
import FieldLabel from './field-label';

storiesOf('Components|FieldLabel', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('FieldLabel', () => {
    const hint = text('hint', 'Enter a number between 0 and 1');

    // hintIcon will only render when hint exists
    const iconNames = Object.keys(icons);
    const icon = select('hintIcon', ['', ...iconNames], 'SortingIcon');
    const hintIcon = icon ? createElement(icons[icon]) : undefined;
    return (
      <Section>
        <FieldLabel
          horizontalConstraint={select(
            'horizontalConstraint',
            Constraints.getAcceptedMaxPropValues(3),
            'scale'
          )}
          title={text('title', 'Sort Order')}
          hasRequiredIndicator={boolean('hasRequiredIndicator', false)}
          tone={select('tone', ['', 'inverted'])}
          onInfoButtonClick={
            boolean('show info button', true)
              ? action('onInfoButtonClick')
              : undefined
          }
          hint={hint}
          hintIcon={hintIcon}
          description={text(
            'description',
            'This order will be used to sort the categories.'
          )}
          badge={
            boolean('show badge', false) ? (
              <FlatButton
                tone="primary"
                icon={<icons.BoxIcon />}
                label="show"
                onClick={() => {}}
              />
            ) : undefined
          }
        />
      </Section>
    );
  });
