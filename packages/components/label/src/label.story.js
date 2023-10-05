import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs/react';
import Constraints from '@commercetools-uikit/constraints';
import Section from '../../../../docs/.storybook/decorators/section';
import Readme from '../README.md';
import Label from './label';

storiesOf('Components|Label', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('Label', () => (
    <Section>
      <Constraints.Horizontal constraint="m">
        <Label
          isBold={boolean('isBold', false)}
          fontWeight={select('fontWeight', ['regular', 'medium', 'bold'])}
          isRequiredIndicatorVisible={boolean(
            'isRequiredIndicatorVisible',
            false
          )}
          tone={select('tone', ['', 'inverted'])}
          htmlFor={text('htmlFor', 'input-field-id')}
        >
          {text('children', 'Label value')}
        </Label>
      </Constraints.Horizontal>
    </Section>
  ));
