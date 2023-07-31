import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Value } from 'react-value';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs/react';
import Constraints from '../../../constraints';
import Section from '../../../../../docs/.storybook/decorators/section';
import Readme from '../README.md';
import SearchTextInput from './search-text-input';

storiesOf('Components|Inputs', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('SearchTextInput', () => {
    return (
      <Section
        backgroundColor={select(
          'storyBackgroundColor',
          {
            Default: null,
            Contrast: 'aliceblue',
          },
          null
        )}
      >
        <Value
          defaultValue=""
          render={(value, onChange) => (
            <SearchTextInput
              id={text('id', '')}
              name={text('name', '')}
              value={value}
              onChange={(event) => {
                action('onChange')(event);
                onChange(event.target.value);
              }}
              isAutofocussed={boolean('isAutofocussed', false)}
              isDisabled={boolean('isDisabled', false)}
              isReadOnly={boolean('isReadOnly', false)}
              isClearable={boolean('isClearable', true)}
              hasError={boolean('hasError', false)}
              hasWarning={boolean('hasWarning', false)}
              placeholder={text('placeholder', 'Placeholder')}
              horizontalConstraint={select(
                'horizontalConstraint',
                Constraints.getAcceptedMaxPropValues(3),
                7
              )}
            />
          )}
        />
      </Section>
    );
  });
