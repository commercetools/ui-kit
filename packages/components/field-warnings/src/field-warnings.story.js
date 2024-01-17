import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, object } from '@storybook/addon-knobs/react';
import Section from '../../../../docs/.storybook/decorators/section';
import Readme from '../README.md';
import FieldWarning from './field-warnings';

storiesOf('Components|FieldWarning', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('FieldWarning', () => {
    return (
      <Section>
        <FieldWarning
          id={text('id', 'warning-id')}
          warnings={object('warnings', {
            customWarning: true,
            defaultWarning: true,
          })}
          renderWarning={(key) =>
            key === 'customWarning'
              ? 'The current password is weak, You may want to use a stronger password'
              : null
          }
          renderDefaultWarning={(key, warning) =>
            key === 'defaultWarning' ? 'Always use a strong password' : null
          }
          isVisible={boolean('isVisible', true)}
        />
      </Section>
    );
  });
