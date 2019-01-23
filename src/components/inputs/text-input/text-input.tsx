import React from 'react';
import invariant from 'tiny-invariant';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import Constraints from '../../constraints';
import styles from './text-input.mod.css';

type HorizontalConstraint = 's' | 'm' | 'l' | 'xl' | 'scale';
type TextInputProps = {
  id?: string;
  name?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<any>) => void;
  onBlur?: (e: React.FocusEvent<any>) => void;
  onFocus?: (e: React.FocusEvent<any>) => void;
  isAutofocussed?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  hasError?: boolean;
  hasWarning?: boolean;
  placeholder?: string;
  horizontalConstraint: HorizontalConstraint;
};

// NOTE: order is important here
// * a disabled-field currently does not display warning/error-states so it takes precedence
// * a readonly-field cannot be changed, but it might be relevant for validation, so error and warning are checked first
// how you can interact with the field is controlled separately by the props, this only influences visuals
const getStyles = (props: TextInputProps): string => {
  if (props.isDisabled) return styles.disabled;
  if (props.hasError) return styles.error;
  if (props.hasWarning) return styles.warning;
  if (props.isReadOnly) return styles.readonly;

  return styles.pristine;
};

const TextInput: React.FC<TextInputProps> = props => {
  invariant(
    !props.isReadOnly && !props.onChange,
    'ui-kit/TextInput: please pass `onChange` when input is not readonly.'
  );

  return (
    <Constraints.Horizontal constraint={props.horizontalConstraint}>
      <input
        id={props.id}
        name={props.name}
        type="text"
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        disabled={props.isDisabled}
        placeholder={props.placeholder}
        className={getStyles(props)}
        readOnly={props.isReadOnly}
        autoFocus={props.isAutofocussed}
        {...filterDataAttributes(props)}
        /* ARIA */
        aria-readonly={props.isReadOnly}
        role="textbox"
        contentEditable={!props.isReadOnly}
      />
    </Constraints.Horizontal>
  );
};

TextInput.displayName = 'TextInput';

TextInput.prototype.isEmpty = (value: string): boolean =>
  !value || value.trim().length === 0;

export default TextInput;
