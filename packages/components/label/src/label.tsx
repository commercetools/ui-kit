import type { MessageDescriptor } from 'react-intl';

import React from 'react';
import { warning } from '@commercetools-uikit/utils';
import Text from '@commercetools-uikit/text';
import RequiredIndicator from './required-indicator';

type TBasicTextProps = {
  intlMessage?: MessageDescriptor;
  children?: React.ReactNode;
};
type TLabelProps = {
  /**
   * Use this to set the relationships between the label and a non-form element.
   * For example:
   *   <label id="foo">
   *   <div aria-labelledby="foo">
   */
  id?: string;
  /**
   * Use this to set the relationships between the label and a form element.
   * For example:
   *   <label for="foo">
   *   <input id="foo">
   *
   *   <label id="foo">
   *   <input aria-labelledby="foo">
   */
  htmlFor?: string;
  isBold?: boolean;
  isRequiredIndicatorVisible?: boolean;
  tone?: 'primary' | 'inverted';
} & TBasicTextProps;

const Label = (props: TLabelProps) => {
  warning(
    !(Boolean(props.id) && Boolean(props.htmlFor)),
    `ui-kit/Label: provide only the "id" or the "htmlFor" properties, not both.`
  );

  const hasContent =
    props.intlMessage || Boolean(React.Children.count(props.children));

  warning(
    hasContent,
    [
      'Warning: Failed prop type:',
      `The prop \`intlMessage\` is marked as required in \`Label\``,
      'but its value is `undefined`',
    ].join(' ')
  );
  warning(
    hasContent,
    [
      'Warning: Failed prop type:',
      `The prop \`children\` is marked as required in \`Label\``,
      'but its value is `undefined`',
    ].join(' ')
  );

  return (
    <label id={props.id} htmlFor={props.htmlFor}>
      <Text.Body tone={props.tone} isBold={props.isBold}>
        {props.intlMessage ? (
          <FormattedMessage {...props.intlMessage} />
        ) : (
          props.children
        )}
        {props.isRequiredIndicatorVisible && <RequiredIndicator />}
      </Text.Body>
    </label>
  );
};

Label.displayName = 'Label';

export default Label;
