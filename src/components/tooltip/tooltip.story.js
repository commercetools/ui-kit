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

    const constraint = select(
      'constraint',
      ['xs', 's', 'm', 'l', 'xl', 'scale'],
      'scale'
    );

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

    const leaveDelay = number('leave delay', 1000);

    return (
      <Section>
        <div
          css={css`
            padding: 80px 0 80px 80px;
          `}
        >
          <p>With ui kit button</p>
          <Tooltip
            title={label}
            leaveDelay={leaveDelay}
            placement={placement}
            constraint={constraint}
          >
            <PrimaryButton onClick={() => {}} label="Submit" />
          </Tooltip>
        </div>
      </Section>
    );
  });
