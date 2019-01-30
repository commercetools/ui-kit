import React from 'react';
import { storiesOf } from '@storybook/react';
import withReadme from 'storybook-readme/with-readme';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import Section from '../../../.storybook/decorators/section';
import Readme from './README.md';
import Tooltip from './tooltip';
import PrimaryButton from '../buttons/primary-button';

storiesOf('Components|Tooltips', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('Tooltip', () => {
    const label = text('children', 'Tooltip text');

    return (
      <Section>
        <Tooltip
          ariaLabel={label}
          title={label}
          type={select(
            'type',
            {
              warning: 'warning',
              error: 'error',
              info: 'info',
              success: 'success',
            },
            'warning'
          )}
        >
          <PrimaryButton label="Click me" />
        </Tooltip>
      </Section>
    );
  });
