import React from 'react';
import { storiesOf } from '@storybook/react';
import { css } from '@emotion/core';
import withReadme from 'storybook-readme/with-readme';
import { withKnobs, text, select, number } from '@storybook/addon-knobs';
import Section from '../../../.storybook/decorators/section';
import Readme from './README.md';
import Tooltip from './tooltip';

storiesOf('Components|Tooltips', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('Tooltip', () => {
    const label = text('children', 'Tooltip text');

    return (
      <Section>
        <Tooltip
          title={label}
          leaveDelay={number('leave delay', 0)}
          position={select(
            'position',
            {
              top: 'top',
              'top-right': 'top-right',
              bottom: 'bottom',
              left: 'left',
              right: 'right',
            },
            'top'
          )}
          type={select(
            'type',
            {
              info: 'info',
              warning: 'warning',
              error: 'error',
            },
            'warning'
          )}
        >
          <button
            css={css`
              background: purple;
              padding: 8px;
              border-color: purple;
              border-radius: 6px;
              color: white;
              font-size: 1rem;
              font-family: 'Open Sans', sans-serif;
              cursor: pointer;
            `}
            aria-label="Click me"
          >
            click me
          </button>
        </Tooltip>
      </Section>
    );
  });
