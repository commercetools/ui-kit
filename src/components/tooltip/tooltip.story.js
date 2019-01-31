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
    const label = text(
      'children',
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.'
    );

    const placement = select(
      'placement',
      {
        top: 'top',
        bottom: 'bottom',
        left: 'left',
        right: 'right',
      },
      'top'
    );
    const type = select(
      'type',
      {
        info: 'info',
        warning: 'warning',
        error: 'error',
      },
      'warning'
    );

    const leaveDelay = number('leave delay', 0);

    return (
      <Section>
        <div
          css={css`
            margin: 24px;
          `}
        >
          <div>With full width button</div>
          <Tooltip
            title={label}
            leaveDelay={leaveDelay}
            placement={placement}
            type={type}
          >
            <button
              css={css`
                background: purple;
                padding: 8px;
                border-color: purple;
                border-radius: 6px;
                width: 100%;
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
          <div
            css={css`
              margin-top: 50px;
            `}
          >
            With full non full width button
          </div>
          <Tooltip
            title={label}
            leaveDelay={leaveDelay}
            placement={placement}
            type={type}
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
        </div>
      </Section>
    );
  });
