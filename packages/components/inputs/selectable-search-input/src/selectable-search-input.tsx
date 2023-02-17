// TODO: @redesign cleanup
import {
  type MouseEvent,
  type KeyboardEvent,
  type ChangeEvent,
  type ReactNode,
  useState,
  useCallback,
  useRef,
} from 'react';
import SecondaryIconButton from '@commercetools-uikit/secondary-icon-button';
import Constraints from '@commercetools-uikit/constraints';
import { SearchIcon, CloseIcon } from '@commercetools-uikit/icons';
import {
  createSequentialId,
  filterDataAttributes,
  warning,
} from '@commercetools-uikit/utils';
import {
  getClearIconButtonStyles,
  getSearchIconButtonStyles,
  getSelectableSearchInputContainerStyles,
  getSelectableSearchInputStyles,
} from './selectable-search-input.styles';
import SelectableSelect from './selectable-select';
import { useFieldId, useToggleState } from '@commercetools-uikit/hooks';
import styled from '@emotion/styled';
import { designTokens, useTheme } from '@commercetools-uikit/design-system';
import { css } from '@emotion/react';
import { type Props as ReactSelectProps } from 'react-select';

const Container = styled.div`
  display: flex;
`;

const getTextInputName = (name?: string) =>
  name ? `${name}.textInput` : undefined;

const getDropdownName = (name?: string) =>
  name ? `${name}.dropdown` : undefined;

type TCustomEvent = {
  target: {
    id?: string;
    name?: string;
    value?: string | string[] | null;
  };
  persist?: () => void;
};

export type TValue = {
  textValue: string;
  dropdownValue: string;
};

export type TOption = {
  value: string;
  label?: ReactNode;
};

export type TOptionObject = {
  options: TOption[];
};

export type TSelectableSearchInputProps = {
  /**
   * Used as HTML id property. An id is auto-generated when it is not specified.
   */
  id?: string;
  /**
   * Used as HTML autocomplete property
   */
  autoComplete?: string;
  /**
   * Indicate if the value entered in the input is invalid.
   */
  'aria-invalid'?: boolean;
  /**
   * HTML ID of an element containing an error message related to the input.
   */
  'aria-errormessage'?: string;
  /**
   * Used as HTML name of the input component property.
   */
  name?: string;
  /**
   * Value of the input. Consists of text input and selected option.
   */
  value: TValue;
  /**
   * Called with the event of the input or dropdown when either the selectable dropdown or the text input have changed.
   */
  onChange?: (event: TCustomEvent) => void;
  /**
   * Called when input is blurred
   */
  onBlur?: (event: TCustomEvent) => void;
  /**
   * Called when input is focused
   */
  onFocus?: (event: TCustomEvent) => void;
  /**
   * Handler when the search button is clicked.
   */
  onSubmit: (searchValue: string) => void;
  /**
   * Handler when the clear button is clicked.
   */
  onReset?: () => void;
  /**
   * Focus the input on initial render
   */
  isAutofocussed?: boolean;
  /**
   * Indicates that the input cannot be modified (e.g not authorized, or changes currently saving).
   */
  isDisabled?: boolean;
  /**
   * Indicates that the field is displaying read-only content
   */
  isReadOnly?: boolean;
  /**
   * Indicates if the input has invalid values
   */
  hasError?: boolean;
  /**
   * Indicates if the input has warning values
   */
  hasWarning?: boolean;
  /**
   * Placeholder text for the input
   */
  placeholder?: string;
  /**
   * Indicates if the input should be cleared when the clear button is clicked.
   * Defaults to true.
   *
   */
  isClearable?: boolean;
  /**
   * Horizontal size limit of the input fields.
   */
  horizontalConstraint?:
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 'scale'
    | 'auto';
  /**
   * Array of options that populate the select menu
   */
  options: TOption[] | TOptionObject[];
  /**
   * z-index value for the menu portal
   */
  menuPortalZIndex?: number;
  /**
   * Dom element to portal the select menu to
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  menuPortalTarget?: ReactSelectProps['menuPortalTarget'];
  /**
   * whether the menu should block scroll while open
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  menuShouldBlockScroll?: ReactSelectProps['menuShouldBlockScroll'];
  /**
   * Handle change events on the menu input
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  onMenuInputChange?: ReactSelectProps['onInputChange'];
  /**
   * Can be used to render a custom value when there are no options (either because of no search results, or all options have been used, or there were none in the first place). Gets called with { inputValue: String }.
   * <br />
   * `inputValue` will be an empty string when no search text is present.
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  noMenuOptionsMessage?: ReactSelectProps['noOptionsMessage'];
  /**
   * Whether to enable search functionality.
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  isMenuSearchable?: ReactSelectProps['isSearchable'];
  /**
   * Maximum height of the menu before scrolling
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  maxMenuHeight?: ReactSelectProps['maxMenuHeight'];
  /**
   * Whether the menu should close after a value is selected. Defaults to `true`.
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  closeMenuOnSelect?: ReactSelectProps['closeMenuOnSelect'];
  /**
   * Horizontal size limit for the dropdown menu.
   */
  menuHorizontalConstraint?: 3 | 4 | 5;
};

const defaultProps: Pick<
  TSelectableSearchInputProps,
  'horizontalConstraint' | 'isClearable' | 'menuHorizontalConstraint'
> = {
  horizontalConstraint: 'scale',
  isClearable: true,
  menuHorizontalConstraint: 3,
};

const selectableSearchInputSequentialId = createSequentialId(
  'selectable-search-input-'
);

const SelectableSearchInput = (props: TSelectableSearchInputProps) => {
  const [textInputHasFocus, toggleTextInputHasFocus] = useToggleState(false);
  const [dropdownHasFocus, toggleDropdownHasFocus] = useToggleState(false);
  const [searchValue, setSearchValue] = useState(props.value.textValue || '');
  const containerRef = useRef<HTMLDivElement>(null);
  const textInputRef = useRef<HTMLInputElement>(null);

  const { isNewTheme } = useTheme();

  const selectablSearchInputId = useFieldId(
    props.id,
    selectableSearchInputSequentialId
  );

  if (!props.isReadOnly) {
    warning(
      typeof props.onChange === 'function',
      'TextInput: `onChange` is required when is not read only.'
    );
  }

  const handleTextInputFocus = useCallback(() => {
    if (props.onFocus)
      props.onFocus({
        target: {
          id: SelectableSearchInput.getTextInputId(selectablSearchInputId),
          name: getTextInputName(props.name),
        },
      });
    toggleTextInputHasFocus(true);
  }, [textInputHasFocus, props.onFocus, selectablSearchInputId, props.name]);

  const handleTextInputBlur = useCallback(() => {
    if (props.onBlur)
      props.onBlur({
        target: {
          id: SelectableSearchInput.getTextInputId(selectablSearchInputId),
          name: getTextInputName(props.name),
        },
      });
    toggleTextInputHasFocus(false);
  }, [textInputHasFocus, props.onBlur, selectablSearchInputId, props.name]);

  const handleClear = () => {
    setSearchValue('');
    if (props.onReset) {
      props.onReset();
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    props.onChange &&
      props.onChange({
        target: {
          id: SelectableSearchInput.getTextInputId(selectablSearchInputId),
          name: getTextInputName(props.name),
          value: event.target.value,
        },
      });
  };

  const handleSubmit = (
    event: KeyboardEvent<HTMLButtonElement> | MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (props.onSubmit) {
      props.onSubmit(searchValue);
    }
  };

  const dropdownName = getDropdownName(props.name);
  const dropdownId = SelectableSearchInput.getDropdownId(
    selectablSearchInputId
  );

  const handleDropdownFocus = useCallback(() => {
    if (props.onFocus)
      props.onFocus({
        target: {
          id: dropdownId,
          name: dropdownName,
        },
      });
    toggleDropdownHasFocus(true);
  }, [props.onFocus, toggleDropdownHasFocus, dropdownName, dropdownId]);

  const handleDropdownBlur = useCallback(() => {
    console.log('eyy???>>>>>>>');
    toggleDropdownHasFocus(false);
  }, [toggleDropdownHasFocus]);

  const handleContainerBlur = useCallback(
    (event) => {
      // ensures that both fields are marked as touched when one of them
      // is blurred
      if (
        typeof props.onBlur === 'function' &&
        !containerRef.current?.contains(event.relatedTarget)
      ) {
        props.onBlur({
          target: {
            id: SelectableSearchInput.getDropdownId(selectablSearchInputId),
            name: getDropdownName(props.name),
          },
        });
        props.onBlur({
          target: {
            id: SelectableSearchInput.getTextInputId(selectablSearchInputId),
            name: getTextInputName(props.name),
          },
        });
      }
    },
    [props.onBlur, selectablSearchInputId, props.name]
  );

  return (
    <Constraints.Horizontal max={props.horizontalConstraint}>
      <Container
        ref={containerRef}
        onBlur={handleContainerBlur}
        data-testid="selectable-search-input-container"
      >
        <Constraints.Horizontal max={props.menuHorizontalConstraint}>
          <SelectableSelect
            {...props}
            id={SelectableSearchInput.getDropdownId(selectablSearchInputId)}
            name={getDropdownName(props.name)}
            textInputHasFocus={textInputHasFocus}
            dropdownHasFocus={dropdownHasFocus}
            handleDropdownFocus={handleDropdownFocus}
            handleDropdownBlur={handleDropdownBlur}
            isNewTheme={isNewTheme}
            textInputRef={textInputRef}
          />
        </Constraints.Horizontal>
        <div
          css={[
            getSelectableSearchInputContainerStyles(props),
            dropdownHasFocus &&
              isNewTheme &&
              css`
                border-left-color: ${designTokens.borderColorForInputWhenFocused};
              `,
          ]}
        >
          <input
            ref={textInputRef}
            id={SelectableSearchInput.getTextInputId(selectablSearchInputId)}
            name={getTextInputName(props.name)}
            type="text"
            value={searchValue}
            onChange={handleChange}
            onBlur={handleTextInputBlur}
            onFocus={handleTextInputFocus}
            disabled={props.isDisabled}
            placeholder={props.placeholder}
            readOnly={props.isReadOnly}
            autoFocus={props.isAutofocussed}
            autoComplete={props.autoComplete}
            aria-readonly={props.isReadOnly}
            contentEditable={!props.isReadOnly}
            css={getSelectableSearchInputStyles(props)}
            {...filterDataAttributes(props)}
            /* ARIA */
            aria-invalid={props['aria-invalid']}
            aria-errormessage={props['aria-errormessage']}
          />
          {props.isClearable &&
            searchValue &&
            !props.isDisabled &&
            !props.isReadOnly && (
              <SecondaryIconButton
                icon={<CloseIcon size="medium" />}
                label={'clear-button'}
                onClick={handleClear}
                css={getClearIconButtonStyles(props)}
              />
            )}
          <SecondaryIconButton
            icon={<SearchIcon />}
            label={'search-button'}
            onClick={handleSubmit}
            css={getSearchIconButtonStyles(props)}
          />
        </div>
      </Container>
    </Constraints.Horizontal>
  );
};

SelectableSearchInput.displayName = 'SelectableSearchInput';
SelectableSearchInput.defaultProps = defaultProps;
SelectableSearchInput.isEmpty = (
  formValue: TSelectableSearchInputProps['value']
) =>
  !formValue ||
  formValue.textValue.trim() === '' ||
  formValue.dropdownValue === '';
SelectableSearchInput.getTextInputId = getTextInputName;
SelectableSearchInput.getDropdownId = getDropdownName;

export default SelectableSearchInput;
