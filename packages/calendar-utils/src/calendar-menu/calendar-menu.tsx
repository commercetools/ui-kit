import { Component, ReactNode } from 'react';
import { css } from '@emotion/react';
import { customProperties as vars } from '@commercetools-uikit/design-system';

type TCalendarMenu = {
  children: ReactNode;
  hasFooter?: boolean;
  hasError?: boolean;
  hasWarning?: boolean;
  footer?: ReactNode;
};

export default class CalendarMenu extends Component<TCalendarMenu> {
  static displayName = 'CalendarMenu';
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
            min-width: 242px;
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
