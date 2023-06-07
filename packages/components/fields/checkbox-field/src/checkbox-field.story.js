import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs/react';
import { createElement } from 'react';
import { Value } from 'react-value';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import Grid from '@commercetools-uikit/grid';
import Section from '../../../../../docs/.storybook/decorators/section';
import CheckBoxField from '.';
import * as icons from '../../../icons';
import Readme from '../README.md';

const states = {
  default: 'Default',
  disabled: 'Disabled',
  readonly: 'Read only',
  error: 'Error',
};

const checkBoxField = 'Fruits';
// hintIcon will only render when hint exists
const iconNames = Object.keys(icons);
const icon = select('hintIcon', ['', ...iconNames], '', checkBoxField);
const hintIcon = icon ? createElement(icons[icon]) : undefined;

storiesOf('Components|Fields', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('CheckboxField', () => (
    <Section>
      <Spacings.Stack>
        {Object.entries(states).map(([stateKey, stateLabel]) => (
          <Grid
            key={stateKey}
            alignItems="center"
            gridTemplateColumns="100px 1fr 1fr 1fr"
          >
            <Text.Body isBold>{stateLabel}</Text.Body>
            <Value
              defaultValue={true}
              render={(isChecked, onChange) => (
                <CheckBoxField
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
                  title={text('title', 'Fruits', checkBoxField)}
                  hint={text('hint', 'Select an option', checkBoxField)}
                  description={text('description', '', checkBoxField)}
                  onInfoButtonClick={
                    boolean('show info button', false, checkBoxField)
                      ? action('onInfoButtonClick')
                      : undefined
                  }
                  hintIcon={hintIcon}
                  badge={text('badge', '', checkBoxField)}
                >
                  {text('Label', 'This is a label')}
                </CheckBoxField>
              )}
            />
            <Value
              defaultValue={false}
              render={(isChecked, onChange) => (
                <CheckBoxField
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
                  title={text('title', 'Fruits', checkBoxField)}
                  hint={text('hint', 'Select an option', checkBoxField)}
                  description={text('description', '', checkBoxField)}
                  onInfoButtonClick={
                    boolean('show info button', false, checkBoxField)
                      ? action('onInfoButtonClick')
                      : undefined
                  }
                  hintIcon={hintIcon}
                  badge={text('badge', '', checkBoxField)}
                >
                  {text('Label', 'This is a label')}
                </CheckBoxField>
              )}
            />
            <Value
              defaultValue={false}
              render={(isChecked, onChange) => {
                return (
                  <CheckBoxField
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
                    title={text('title', 'Fruits', checkBoxField)}
                    hint={text('hint', 'Select an option', checkBoxField)}
                    description={text('description', '', checkBoxField)}
                    onInfoButtonClick={
                      boolean('show info button', false, checkBoxField)
                        ? action('onInfoButtonClick')
                        : undefined
                    }
                    hintIcon={hintIcon}
                    badge={text('badge', '', checkBoxField)}
                  >
                    {text('Label', 'This is a label')}
                  </CheckBoxField>
                );
              }}
            />
          </Grid>
        ))}
      </Spacings.Stack>
    </Section>
  ));
