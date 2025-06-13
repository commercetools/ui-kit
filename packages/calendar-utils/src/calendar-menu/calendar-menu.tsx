import { Component, ReactNode } from 'react';
import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';

type TCalendarMenu = {
  children: ReactNode;
  hasFooter?: boolean;
  hasError?: boolean;
  hasWarning?: boolean;
  footer?: ReactNode;
  /**
   * Indicates the appearance of the calendar menu.
   * Filter appearance removes box shadows and positioning for inline display.
   */
  appearance?: 'default' | 'filter';
};

export default class CalendarMenu extends Component<TCalendarMenu> {
  static displayName = 'CalendarMenu';
  render() {
    const {
      hasFooter,
      hasWarning,
      hasError,
      appearance = 'default',
      ...rest
    } = this.props;

    return (
      <div
        {...rest}
        css={[
          css`
            overflow-y: scroll;
            color: ${designTokens.colorSolid};
            font-family: inherit;
            border: none;
            box-shadow: ${appearance === 'filter'
              ? 'none'
              : '0 2px 5px 0px rgba(0, 0, 0, 0.15)'};
            border-radius: ${designTokens.borderRadiusForInput};
            margin-top: ${designTokens.spacing10};
            font-size: ${designTokens.fontSize30};
            position: ${appearance === 'filter' ? 'inherit' : 'absolute'};
            box-sizing: border-box;
            width: 100%;
            background-color: ${designTokens.colorSurface};
            min-width: ${designTokens.constraint5};
            z-index: ${appearance === 'filter'
              ? 'inherit'
              : '99999'}; /* copied from flatpickr */
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
