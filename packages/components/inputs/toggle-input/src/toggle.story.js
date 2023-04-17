import { Value } from 'react-value';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import Section from '../../../../../docs/.storybook/decorators/section';
import Readme from '../README.md';
import Toggle from '.';

storiesOf('Components|Inputs', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('Toggle', () => (
    <Section>
      <Value
        defaultValue={false}
        render={(value, onChange) => (
          <Toggle
            id={text('id', 'toggle-id')}
            name={text('name', '')}
            size={select('size', ['small', 'big'], 'big')}
            isDisabled={boolean('isDisabled', false)}
            isChecked={value}
            onChange={(event) => {
              action('onChange')(event);
              onChange(event.target.checked);
            }}
          />
        )}
      />
    </Section>
  ));
