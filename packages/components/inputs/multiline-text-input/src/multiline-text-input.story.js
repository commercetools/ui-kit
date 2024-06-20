import { createElement } from 'react';
import { Value } from 'react-value';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs/react';
import Constraints from '@commercetools-uikit/constraints';
import Section from '../../../../../docs/.storybook/decorators/section';
import Readme from '../README.md';
import MultilineTextInput from './multiline-text-input';
import * as icons from '@commercetools-uikit/icons';

const iconNames = Object.keys(icons);
const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9];

storiesOf('Components|Inputs', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('MultilineTextInput', () => {
    const defaultValue = text('default value', '');
    const defaultExpandMultilineText = boolean(
      'defaultExpandMultilineText',
      false
    );
    return (
      <Section>
        <Value
          // remount component when defaults change
          key={`${defaultValue}-${defaultExpandMultilineText}`}
          defaultValue={defaultValue}
          render={(value, onChange) => (
            <MultilineTextInput
              name={text('name', undefined)}
              id={text('id', undefined)}
              onBlur={action('onBlur')}
              onFocus={action('onFocus')}
              isAutofocussed={boolean('isAutofocussed', false)}
              defaultExpandMultilineText={defaultExpandMultilineText}
              placeholder={text('placeholder')}
              horizontalConstraint={select(
                'horizontalConstraint',
                Constraints.getAcceptedMaxPropValues(6),
                'scale'
              )}
              isDisabled={boolean('isDisabled', false)}
              isReadOnly={boolean('isReadOnly', false)}
              isCondensed={boolean('isCondensed', false)}
              maxRows={select('maxRows', rows, 1)}
              hasError={boolean('hasError', false)}
              hasWarning={boolean('hasWarning', false)}
              value={value}
              onChange={(event) => {
                action('onChange')(event);
                onChange(event.target.value);
              }}
              rightActionIcon={
                boolean('hasRightAction') &&
                createElement(
                  icons[select('rightActionIcon', iconNames, iconNames[0])]
                )
              }
              rightActionProps={{
                label: 'Right action',
                onClick: action('rightAction onClick'),
              }}
            />
          )}
        />
      </Section>
    );
  });
