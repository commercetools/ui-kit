import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs/react';
import { Value } from 'react-value';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import Grid from '@commercetools-uikit/grid';
import Section from '../../../../../docs/.storybook/decorators/section';
import Readme from '../README.md';
import CheckboxInput from './checkbox-input';

const states = {
  default: 'Default',
  disabled: 'Disabled',
  readonly: 'Read only',
  error: 'Error',
};

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
        {Object.entries(states).map(([stateKey, stateLabel]) => (
          <Grid
            key={stateKey}
            alignItems="center"
            gridTemplateColumns="100px 1fr 1fr 1fr"
          >
            <Text.Body fontWeight="bold">{stateLabel}</Text.Body>
            <Value
              defaultValue={true}
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
                  isHovered={boolean('isHovered', false)}
                  isDisabled={stateLabel === states.disabled}
                  isReadOnly={stateLabel === states.readonly}
                  hasError={stateLabel === states.error}
                >
                  {text('Label', 'This is a label')}
                </CheckboxInput>
              )}
            />
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
                  isHovered={boolean('isHovered', false)}
                  isDisabled={stateLabel === states.disabled}
                  isReadOnly={stateLabel === states.readonly}
                  hasError={stateLabel === states.error}
                >
                  {text('Label', 'This is a label')}
                </CheckboxInput>
              )}
            />
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
                  isIndeterminate
                  isHovered={boolean('isHovered', false)}
                  isDisabled={stateLabel === states.disabled}
                  isReadOnly={stateLabel === states.readonly}
                  hasError={stateLabel === states.error}
                >
                  {text('Label', 'This is a label')}
                </CheckboxInput>
              )}
            />
          </Grid>
        ))}
      </Spacings.Stack>
    </Section>
  ));
