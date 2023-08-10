import { createElement } from 'react';
import { MemoryRouter, Link } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs/react';
import * as icons from '@commercetools-uikit/icons';
import Section from '../../../../../docs/.storybook/decorators/section';
import Readme from '../README.md';
import SecondaryButton from './secondary-button';

const iconNames = Object.keys(icons);

storiesOf('Components|Buttons', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('SecondaryButton', () => {
    const toProp = text('to');
    const isToggled = boolean('isToggled', false);
    const isToggleButton = boolean('isToggleButton', false);
    const toggleProps = isToggleButton ? { isToggled } : {};
    const linkProps = (toProp ?? '').length > 0 ? { to: toProp, as: Link } : {};
    return (
      <Section>
        <MemoryRouter>
          <SecondaryButton
            type={select('type', ['button', 'reset', 'submit'], 'button')}
            tone={select('tone', ['info', 'secondary'], 'secondary')}
            size={select('size', ['medium', 'big'], 'big')}
            iconLeft={createElement(
              icons[select('iconLeft', iconNames, iconNames[0])]
            )}
            onClick={action('onClick')}
            label={text('label', 'Accessibility text')}
            isToggleButton={boolean('isToggleButton', false)}
            isDisabled={boolean('isDisabled', false)}
            {...linkProps}
            {...toggleProps}
          />
        </MemoryRouter>
      </Section>
    );
  });
