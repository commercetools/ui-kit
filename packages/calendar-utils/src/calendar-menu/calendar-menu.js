import { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { customProperties as vars } from '@commercetools-uikit/design-system';

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
    const { hasFooter, hasWarning, hasError, ...rest } = this.props;

    return (
      <div
        {...rest}
        css={[
          css`
            overflow-y: scroll;
            color: ${vars.colorSolid};
            font-family: inherit;
            border: 1px solid ${vars.borderColorForInputWhenFocused};
            border-radius: ${vars.borderRadiusForInput};
            margin-top: ${vars.spacingXs};
            font-size: ${vars.fontSizeDefault};
            position: absolute;
            box-sizing: border-box;
            width: 100%;
            background-color: ${vars.colorSurface};
            z-index: 99999; /* copied from flatpickr */
          `,
          !hasFooter &&
            css`
              padding-bottom: 10px;
            `,
          hasError &&
            css`
              border-color: ${vars.borderColorForInputWhenError};
            `,
          hasWarning &&
            css`
              border-color: ${vars.borderColorForInputWhenWarning};
            `,
        ]}
      >
        {this.props.children}
        {this.props.footer}
      </div>
    );
  }
}
