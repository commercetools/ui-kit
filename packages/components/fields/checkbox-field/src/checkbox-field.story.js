import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  boolean,
  text,
  select,
  object,
} from '@storybook/addon-knobs/react';
import { createElement } from 'react';
import { Value } from 'react-value';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import Section from '../../../../../docs/.storybook/decorators/section';
import CheckboxField from '.';
import * as icons from '../../../icons';
import Readme from '../README.md';

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
        <Text.Body isBold>CheckboxField</Text.Body>
        <Value
          defaultValue={true}
          render={(isChecked, onChange) => {
            // hintIcon will only render when hint exists
            const iconNames = Object.keys(icons);
            const icon = select('hintIcon', ['', ...iconNames], '');
            const hintIcon = icon ? createElement(icons[icon]) : undefined;

            return (
              <CheckboxField
                id={text('id', '')}
                name={text('name', '')}
                onChange={(event) => {
                  action('onChange')(event);
                  onChange(!isChecked);
                }}
                value={text('value', '')}
                isChecked={isChecked}
                isHovered={boolean('isHovered', false)}
                isDisabled={boolean('isDisabled', false)}
                isReadOnly={boolean('isReadOnly', false)}
                hasError={boolean('Error', false)}
                title={text('title', 'Fruits', '')}
                hint={text('hint', 'Select an option', '')}
                description={text('description', '', '')}
                onInfoButtonClick={
                  boolean('show info button', false, '')
                    ? action('onInfoButtonClick')
                    : undefined
                }
                errors={object('errors', { missing: true, customError: true })}
                renderError={(key) => {
                  switch (key) {
                    case 'customError':
                      return 'A custom error.';
                    default:
                      return null;
                  }
                }}
                isRequired={boolean('isRequired', false, '')}
                touched={boolean('touched', false, '')}
                hintIcon={hintIcon}
              >
                {text('Label', 'This is a label')}
              </CheckboxField>
            );
          }}
        />
      </Spacings.Stack>
    </Section>
  ));
