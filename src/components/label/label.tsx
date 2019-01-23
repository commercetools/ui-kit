import React from 'react';
import Text from '../typography/text';
import RequiredIndicator from './required-indicator';

type ToneOfLabel = 'primary' | 'inverted';
type LabelProps = {
  tone?: ToneOfLabel;
  children?: React.ReactNode;
  isBold?: boolean;
  isRequiredIndicatorVisible?: boolean;
  htmlFor?: string;
};

const Label: React.FC<LabelProps> = props => (
  <label htmlFor={props.htmlFor}>
    <Text.Body tone={props.tone} isBold={props.isBold}>
      {props.children}
      {props.isRequiredIndicatorVisible && <RequiredIndicator />}
    </Text.Body>
  </label>
);

Label.displayName = 'Label';

export default Label;
