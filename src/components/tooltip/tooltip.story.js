import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import withReadme from 'storybook-readme/with-readme';
import {
  withKnobs,
  boolean,
  text,
  select,
  number,
} from '@storybook/addon-knobs';
import Section from '../../../.storybook/decorators/section';
import Readme from './README.md';
import Tooltip from './tooltip';
import PrimaryButton from '../buttons/primary-button';

const CustomWrapper = styled.div`
  display: block;
  background-color: pink;
`;

CustomWrapper.propTypes = {
  children: PropTypes.node,
};
CustomWrapper.displayName = 'CustomWrapper';

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

    const closeAfter = number('close after', 1000);

    const fullWidth = boolean('full width wrapper', false);

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
            closeAfter={closeAfter}
            placement={placement}
            horizontalConstraint={constraint}
            components={{ WrapperComponent: fullWidth ? CustomWrapper : null }}
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
