import type { MessageDescriptor } from 'react-intl';

import { Children, type ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import { warning } from '@commercetools-uikit/utils';
import Text from '@commercetools-uikit/text';
import RequiredIndicator from './required-indicator';
import { css } from '@emotion/react';

export type TLabelProps = {
  /**
   * The `id` HTML attribute, used to reference non-form elements with the related attribute `aria-labelledby`.
   * <br/>
   * Use this to set the relationships between the label and a non-form element.
   * <br />
   * For example:
   * ````
   *   <label id="foo">
   *   <div aria-labelledby="foo">
   * ````
   */
  id?: string;
  /**
   * The `for` HTML attribute, used to reference form elements with the related attribute `id` or `aria-labelledby`.
   * <br />
   * Use this to set the relationships between the label and a form element.
   * <br />
   * For example:
   * ````
   *   <label for="foo">
   *   <input id="foo">
   *
   *   <label id="foo">
   *   <input aria-labelledby="foo">
   * ````
   */
  htmlFor?: string;
  // Indicates the weight (or boldness) of the font.
  fontWeight?: 'regular' | 'medium' | 'bold';
  // Indicates if the labeled field is required in a form
  isRequiredIndicatorVisible?: boolean;
  // Indicates the tone to be applied to the label
  tone?: 'primary' | 'inverted';
  /**
   * A `MessageDescriptor` rendered `children` to `Label`.
   * <br />
   * When a value is provided, `intlMessage` will be rendered instead of `children`
   * <br />
   * This is required when `children` is `undefined` and vice versa
   */
  intlMessage?: MessageDescriptor & {
    values?: Record<string, ReactNode>;
  };
  /**
   * Rendered as `children` to `Label`.
   * <br />
   * This is required when `intlMessage` is `undefined` and vice versa
   */
  children?: ReactNode;
};

const Label = (props: TLabelProps) => {
  warning(
    !(Boolean(props.id) && Boolean(props.htmlFor)),
    `ui-kit/Label: provide only the "id" or the "htmlFor" properties, not both.`
  );
  const hasContent =
    props.intlMessage || Boolean(Children.count(props.children));
  warning(
    hasContent,
    [
      'ui-kit/Label:',
      '"intlMessage" is required when "children" is `undefined` and vice versa.',
      'Provide "intlMessage" or "children"',
    ].join(' ')
  );

  return (
    <label
      css={css`
        > div {
          font-weight: ${props.fontWeight};
          display: flex;
        }
      `}
      id={props.id}
      htmlFor={props.htmlFor}
    >
      <Text.Detail tone={props.tone} fontWeight={props.fontWeight}>
        {props.intlMessage ? (
          <FormattedMessage {...props.intlMessage} />
        ) : (
          props.children
        )}
        {props.isRequiredIndicatorVisible && <RequiredIndicator />}
      </Text.Detail>
    </label>
  );
};

Label.displayName = 'Label';

export default Label;
