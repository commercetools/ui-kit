import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';

const getFillColor = props => {
  if (props.isDisabled) return vars.colorNeutral60;
  if (props.isActive) return vars.colorSurface;
  return vars.colorSolid;
};

const propsToOmit = ['isActive', 'label', 'isDisabled'];

const RichTextBodyButton = props => {
  const restOfProps = omit(props, propsToOmit);

  return (
    <button
      {...restOfProps}
      type="button"
      data-button-type="rich-text-button"
      aria-disabled={props.isDisabled}
      aria-label={props.label}
      css={[
        css`
          border: 0;
          cursor: pointer;
          background: ${props.isActive ? vars.colorAccent30 : 'transparent'};
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: ${vars.spacingXs};
          padding: ${vars.spacingXs};

          * {
            fill: ${getFillColor(props)};
          }

          &:focus {
            outline: none;
          }

          &:hover,
          &:focus {
            background: ${props.isActive
              ? vars.colorAccent30
              : vars.colorNeutral90};
            * {
              fill: ${props.isActive ? vars.colorSurface : vars.colorSolid};
            }
          }
        `,
        props.isDisabled &&
          css`
            pointer-events: none;
          `,
      ]}
    >
      {props.children}
    </button>
  );
};

RichTextBodyButton.propTypes = {
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  children: PropTypes.element.isRequired,
};

RichTextBodyButton.displayName = 'RichTextInputButton';

export default RichTextBodyButton;
