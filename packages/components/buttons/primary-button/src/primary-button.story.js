import { createElement } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs/react';
import * as icons from '../../../icons';
import Section from '../../../../../docs/.storybook/decorators/section';
import Readme from '../README.md';
import PrimaryButton from './primary-button';

const iconNames = Object.keys(icons);

storiesOf('Components|Buttons', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('PrimaryButton', () => {
    const selectedIcon = select('iconLeft', ['', ...iconNames], iconNames[0]);
    return (
      <Section>
        <PrimaryButton
          type={select('type', ['submit', 'reset', 'button'], 'button')}
          tone={select('tone', ['urgent', 'primary', 'critical'], 'primary')}
          size={select('size', ['medium', 'big'], 'big')}
          {...(selectedIcon
            ? { iconLeft: createElement(icons[selectedIcon]) }
            : {})}
          label={text('label', 'Accessibility text')}
          isToggleButton={boolean('isToggleButton', false)}
          isToggled={boolean('isToggled', false)}
          isDisabled={boolean('isDisabled', false)}
          onClick={action('onClick')}
        />
      </Section>
    );
  });
