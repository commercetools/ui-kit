import React, { Component } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash.omit';
import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';

export default class CalendarMenu extends Component {
  static displayName = 'CalendarMenu';
  static propTypes = {
    children: PropTypes.node.isRequired,
    hasFooter: PropTypes.bool,
    hasError: PropTypes.bool,
    hasWarning: PropTypes.bool,
    footer: PropTypes.node,
  };
  render() {
    return (
      <div
        {...omit(this.props, ['hasFooter', 'hasError', 'hasWarning'])}
        css={css`
          overflow-y: scroll;
          color: ${vars.colorBlack};
          font-family: ${vars.fontFamilyDefault};
          border: 1px solid ${vars.borderColorInputFocus};
          border-radius: ${vars.borderRadiusInput};
          margin-top: ${vars.spacing4};
          font-size: ${vars.fontSizeDefault};
          position: absolute;
          box-sizing: border-box;
          width: 100%;
          background-color: ${vars.colorWhite};
          z-index: 99999; /* copied from flatpickr */;
          ${this.props.hasFooter ? '' : `padding-bottom: 10px;`}
          ${
            this.props.hasError
              ? `border-color: ${vars.borderColorInputError};`
              : ''
          }
          ${
            this.props.hasWarning
              ? `border-color: ${vars.borderColorInputWarning};`
              : ''
          }
        `}
      >
        {this.props.children}
        {this.props.footer}
      </div>
    );
  }
}
