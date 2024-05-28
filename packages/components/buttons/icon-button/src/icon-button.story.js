import { createElement } from 'react';
import { MemoryRouter, Link } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs/react';
import Section from '../../../../../docs/.storybook/decorators/section';
import * as icons from '../../../icons';
import Readme from '../README.md';
import IconButton from './icon-button';

const iconNames = Object.keys(icons);

storiesOf('Components|Buttons', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('IconButton', () => {
    const to = text('to', '');

    return (
      <Section>
        <MemoryRouter>
          <IconButton
            as={to ? Link : null}
            to={to}
            type={select('type', ['submit', 'reset', 'button'], 'button')}
            shape={select('shape', ['round', 'square'], 'round')}
            size={select(
              'size',
              ['big', 'medium', 'small', '10', '20', '30', '40'],
              'big'
            )}
            theme={select('theme', ['primary', 'info', 'default'], 'default')}
            icon={createElement(icons[select('icon', iconNames, iconNames[0])])}
            onClick={action('onClick')}
            label={text('label', 'Accessibility text')}
            isToggleButton={boolean('isToggleButton', true)}
            isToggled={boolean('isToggled', true)}
            isDisabled={boolean('isDisabled?', false)}
          />
        </MemoryRouter>
      </Section>
    );
  });
