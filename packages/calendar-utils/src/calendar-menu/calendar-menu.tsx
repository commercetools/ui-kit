import { Component, ReactNode } from 'react';
import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';

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
            color: ${designTokens.colorSolid};
            font-family: inherit;
            border: none;
            box-shadow: 0 2px 5px 0px rgba(0, 0, 0, 0.15);
            border-radius: ${designTokens.borderRadiusForInput};
            margin-top: ${designTokens.spacing10};
            font-size: ${designTokens.fontSize30};
            position: absolute;
            box-sizing: border-box;
            width: 100%;
            background-color: ${designTokens.colorSurface};
            min-width: ${designTokens.constraint5};
            z-index: 99999; /* copied from flatpickr */
          `,
          !hasFooter &&
            css`
              padding-bottom: 10px;
            `,
          hasError &&
            css`
              border-color: ${designTokens.borderColorForInputWhenError};
            `,
          hasWarning &&
            css`
              border-color: ${designTokens.borderColorForInputWhenWarning};
            `,
        ]}
      >
        {this.props.children}
        {this.props.footer}
      </div>
    );
  }
}
