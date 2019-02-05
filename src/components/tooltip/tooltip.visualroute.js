import React from 'react';
import { css } from '@emotion/core';
import { PrimaryButton, Tooltip } from 'ui-kit';
import { Suite, Spec } from '../../../test/percy';

const title = 'What kind of bear is best';
const longTitle = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit,
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
  nisi.
`;
const noop = () => {};

export const routePath = '/tooltip';

const constraints = ['xs', 's', 'm', 'l', 'xl', 'scale'];

const placements = [
  'top',
  'top-start',
  'top-end',
  'right',
  'right-start',
  'right-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
];

export const component = () => (
  <Suite>
    <Spec label="Closed" small omitPropsList>
      <Tooltip title={title}>
        <PrimaryButton onClick={noop} label="Hello" />
      </Tooltip>
    </Spec>
    {constraints.map(constraint => {
      const small =
        constraint !== 'xl' && constraint !== 'scale' && constraint !== 's';
      return (
        <Spec
          small={small}
          omitPropsList
          key={constraint}
          label={`Open - placement bottom - constraint ${constraint}`}
        >
          <Tooltip
            title={constraint !== 'xs' ? longTitle : title}
            open={true}
            small={small}
            placement="bottom"
            horizontalConstraint={constraint}
          >
            <PrimaryButton onClick={noop} label="Hello" />
          </Tooltip>
        </Spec>
      );
    })}
    {placements.map(placement => (
      <Spec
        key={placement}
        label={`Open - placement  ${placement}`}
        omitPropsList
        small
      >
        <div
          css={css`
            padding: 80px 0 80px 200px;
          `}
        >
          <Tooltip title={title} open={true} placement={placement}>
            <PrimaryButton onClick={noop} label="Hello" />
          </Tooltip>
        </div>
      </Spec>
    ))}
  </Suite>
);
