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
          <div
            style={{
              width: '200px',
              height: '40px',
              overflowY: 'scroll',
              zIndex: '1',
              position: 'relative',
              border: '1px solid black',
            }}
          >
            <div
              style={{
                position: 'sticky',
                top: '0',
                width: '100%',
                height: '10px',
                background: 'pink',
                zIndex: 1,
              }}
            ></div>
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
          </div>
        )}
      />
    </Section>
  ));
