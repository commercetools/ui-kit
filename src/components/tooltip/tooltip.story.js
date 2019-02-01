import React from 'react';
import { storiesOf } from '@storybook/react';
import { css } from '@emotion/core';
import withReadme from 'storybook-readme/with-readme';
import { withKnobs, text, select, number } from '@storybook/addon-knobs';
import Section from '../../../.storybook/decorators/section';
import Readme from './README.md';
import Tooltip from './tooltip';
import PrimaryButton from '../buttons/primary-button';

storiesOf('Components|Tooltips', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('Tooltip', () => {
    const label = text('children', 'Tool tip text.');

    const placement = select(
      'placement',
      {
        top: 'top',
        'top-start': 'top-start',
        'top-end': 'top-end',
        right: 'right',
        'right-start': 'right-start',
        'right-end': 'right-end',
        bottom: 'bottom',
        'bottom-start': 'bottom-start',
        'bottom-end': 'bottom-end',
        left: 'left',
        'left-start': 'left-start',
        'left-end': 'left-end',
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
            <div
              css={css`
                display: inline-block;
              `}
            >
              <button
                disabled
                css={css`
                  background: purple;
                  padding: 8px;
                  pointer-events: none;
                  border-color: purple;
                  border-radius: 6px;
                  color: white;
                  width: 150px;
                  font-size: 1rem;
                  font-family: 'Open Sans', sans-serif;
                  cursor: pointer;
                `}
                aria-label="Click me"
              >
                click me
              </button>
            </div>
          </Tooltip>

          <div
            css={css`
              margin-top: 50px;
            `}
          >
            With ui kit button
          </div>
          <Tooltip
            title={label}
            leaveDelay={leaveDelay}
            placement={placement}
            type={type}
          >
            <PrimaryButton onClick={() => {}} label="don't click me" />
          </Tooltip>

          <div
            css={css`
              margin-top: 50px;
            `}
          >
            With disabled ui kit button
          </div>
          <Tooltip
            title={label}
            leaveDelay={leaveDelay}
            placement={placement}
            type={type}
          >
            <div
              css={css`
                display: inline-block;
              `}
            >
              <PrimaryButton
                isDisabled
                onClick={() => {}}
                label="don't click me"
              />
            </div>
          </Tooltip>
        </div>
      </Section>
    );
  });
