import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import {
  withKnobs,
  boolean,
  text,
  select,
  number,
} from '@storybook/addon-knobs/react';
import PrimaryButton from '@commercetools-uikit/primary-button';
import Section from '../../../.storybook/decorators/section';
import Readme from './README.md';
import Tooltip from './tooltip';

const CustomWrapper = styled.div`
  display: block;
  background-color: pink;
`;

const CustomBody = styled.div`
  font-size: 0.875rem;
  color: red;
`;

storiesOf('Components|Tooltips', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
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

    const closeAfter = number('close after', 1000);

    const fullWidth = boolean('full width wrapper', false);
    const customBodyWrapper = boolean('custom body wrapper', false);

    return (
      <Section>
        <div
          css={css`
            padding: 80px 0 80px 80px;
          `}
        >
          <p>With ui kit button</p>
          <Tooltip
            off={boolean('off', false)}
            title={label}
            closeAfter={closeAfter}
            placement={placement}
            horizontalConstraint={constraint}
            components={{
              WrapperComponent: fullWidth ? CustomWrapper : null,
              BodyComponent: customBodyWrapper ? CustomBody : null,
            }}
          >
            <PrimaryButton
              onClick={() => {}}
              label="Submit"
              isDisabled={boolean('button disabled', false)}
            />
          </Tooltip>
        </div>
      </Section>
    );
  });
