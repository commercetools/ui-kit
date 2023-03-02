// TODO: @redesign cleanup
import type { ChangeEventHandler } from 'react';
import { useTheme } from '@commercetools-uikit/design-system';
import {
  filterDataAttributes,
  filterAriaAttributes,
} from '@commercetools-uikit/utils';
import { accessibleHiddenInputStyles } from '@commercetools-uikit/input-utils';
import { Label, Span, getInputStyles } from './toggle-input.styles';

export type TToggleInputProps = {
  /**
   * Used as the HTML `id` property
   */
  id?: string;
  /**
   * Used as the HTML `name` property
   */
  name?: string;
  /**
   * The size of the ToggleInput component.
   */
  size: 'small' | 'big';
  /**
   * Disables the ToggleInput
   */
  isDisabled: boolean;
  /**
   * Checks the ToggleInput
   */
  isChecked: boolean;
  /**
   * Determines the toggle state.
   */
  value?: string;
  /**
   * Handler when toggle state changes. <br/>
   * **Note**: that key value of the `target` is `checked`.
   */
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export const defaultProps: Pick<
  TToggleInputProps,
  'isDisabled' | 'isChecked' | 'size'
> = {
  isDisabled: false,
  isChecked: false,
  size: 'big',
};

const ToggleInput = (props: TToggleInputProps) => {
  const { isNewTheme, themedValue } = useTheme();

  return (
    <Label
      htmlFor={props.id}
      size={props.size}
      isDisabled={props.isDisabled}
      isNewTheme={isNewTheme}
      themedValue={themedValue}
    >
      <input
        type="checkbox"
        css={[
          accessibleHiddenInputStyles,
          getInputStyles({ ...props, isNewTheme, themedValue }),
        ]}
        id={props.id}
        name={props.name}
        onChange={props.onChange}
        disabled={props.isDisabled}
        checked={props.isChecked}
        value={props.value}
        {...filterDataAttributes(props)}
        {...filterAriaAttributes(props)}
      />
      <Span
        aria-hidden="true"
        size={props.size}
        isNewTheme={isNewTheme}
        themedValue={themedValue}
      />
    </Label>
  );
};

ToggleInput.displayName = 'Toggle';
ToggleInput.defaultProps = defaultProps;

export default ToggleInput;
