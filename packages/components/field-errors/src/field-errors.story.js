import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, object } from '@storybook/addon-knobs/react';
import Section from '../../../../docs/.storybook/decorators/section';
import Readme from '../README.md';
import FieldErrors from './field-errors';

storiesOf('Components|FieldError', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('FieldError', () => {
    return (
      <Section>
        <FieldErrors
          id={text('id', 'error-id')}
          errors={object('errors', {
            missing: true,
            duplicate: true,
            minLength: true,
          })}
          renderError={(key) => {
            switch (key) {
              case 'duplicate':
                return 'This is already in use. It must be unique.';
              default:
                // When null is returned then the default error handling from
                // renderDefaultError will kick in for that error.
                return null;
            }
          }}
          renderDefaultError={(key) => {
            switch (key) {
              case 'minLength':
                return 'This is too short.';
              default:
                // When null is returned then the error handling defined in
                // FieldError itself will kick in
                return null;
            }
          }}
          isVisible={boolean('isVisible', true)}
        />
      </Section>
    );
  });
