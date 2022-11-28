import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { Value } from 'react-value';
import Spacings from '@commercetools-uikit/spacings';
import Section from '../../../../../docs/.storybook/decorators/section';
import Readme from '../README.md';
import CheckboxInput from './checkbox-input';

storiesOf('Components|Inputs', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('CheckboxInput', () => (
    <Section>
      <Spacings.Stack>
        <Value
          defaultValue={false}
          render={(isChecked, onChange) => (
            <CheckboxInput
              id={text('id', '')}
              name={text('name', '')}
              onChange={(event) => {
                action('onChange')(event);
                onChange(!isChecked);
              }}
              value={text('value', '')}
              isChecked={isChecked}
              isIndeterminate={boolean('isIndeterminate', false)}
              isHovered={boolean('isHovered', false)}
              isDisabled={boolean('isDisabled', false)}
              isReadOnly={boolean('isReadOnly', false)}
              hasError={boolean('hasError', false)}
            >
              {text('Label', 'This is a label')}
            </CheckboxInput>
          )}
        />
      </Spacings.Stack>
    </Section>
  ));
