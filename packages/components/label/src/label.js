import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'tiny-invariant';
import Text from '@commercetools-uikit/text';
import { FormattedMessage } from 'react-intl';
import requiredIf from 'react-required-if';
import RequiredIndicator from './required-indicator';

const Label = (props) => {
  if (props.id && props.htmlFor) {
    invariant(
      false,
      `ui-kit/Label: provide only the "id" or the "htmlFor" properties, not both.`
    );
  }
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

Label.propTypes = {
  // FIXME: Add proper tone when tones are refactored
  tone: PropTypes.oneOf(['primary', 'inverted']),
  isBold: PropTypes.bool,
  isRequiredIndicatorVisible: PropTypes.bool,
  /**
   * Use this to set the relationships between the label and a form element.
   * For example:
   *   <label for="foo">
   *   <input id="foo">
   *
   *   <label id="foo">
   *   <input aria-labelledby="foo">
   */
  htmlFor: PropTypes.string,
  /**
   * Use this to set the relationships between the label and a non-form element.
   * For example:
   *   <label id="foo">
   *   <div aria-labelledby="foo">
   */
  id: PropTypes.string,
  intlMessage: requiredIf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      description: PropTypes.string,
      defaultMessage: PropTypes.string.isRequired,
    }),
    (props) => !React.Children.count(props.children)
  ),
  children: requiredIf(PropTypes.node, (props) => !props.intlMessage),
};

export { Label };
