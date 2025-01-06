import type { ChangeEventHandler } from 'react';
import {
  filterDataAttributes,
  filterAriaAttributes,
} from '@commercetools-uikit/utils';
import { accessibleHiddenInputStyles } from '@commercetools-uikit/input-utils';
import {
  Label,
  Span,
  getInputStyles,
  trackSizes,
  thumbSizes,
} from './toggle-input.styles';

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
  size?: 'small' | 'big';
  /**
   * Disables the ToggleInput
   */
  isDisabled?: boolean;
  /**
   * Checks the ToggleInput
   */
  isChecked?: boolean;
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

export {};

const ToggleInput = ({
  isDisabled = false,
  isChecked = false,
  size = 'big',
  ...props
}: TToggleInputProps) => {
  return (
    <Label
      htmlFor={props.id}
      size={size}
      isDisabled={isDisabled}
      trackSizes={trackSizes}
      thumbSizes={thumbSizes}
    >
      <input
        type="checkbox"
        css={[
          accessibleHiddenInputStyles,
          getInputStyles({ trackSizes, thumbSizes, size, ...props }),
        ]}
        id={props.id}
        name={props.name}
        onChange={isDisabled ? () => {} : props.onChange}
        disabled={isDisabled}
        checked={isChecked}
        value={props.value}
        {...filterDataAttributes({
          isDisabled,
          isChecked,
          size,
          ...props,
        })}
        {...filterAriaAttributes({
          isDisabled,
          isChecked,
          size,
          ...props,
        })}
      />
      <Span
        aria-hidden="true"
        size={size}
        trackSizes={trackSizes}
        thumbSizes={thumbSizes}
      />
    </Label>
  );
};

ToggleInput.displayName = 'Toggle';

export default ToggleInput;
