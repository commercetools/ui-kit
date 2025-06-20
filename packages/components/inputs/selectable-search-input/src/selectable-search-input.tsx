import {
  type MouseEvent,
  type KeyboardEvent,
  type ChangeEvent,
  type ReactNode,
  type FocusEvent,
  useState,
  useCallback,
  useRef,
  ReactElement,
} from 'react';
import SecondaryIconButton from '@commercetools-uikit/secondary-icon-button';
import IconButton, {
  type TIconButtonProps,
} from '@commercetools-uikit/icon-button';
import Constraints from '@commercetools-uikit/constraints';
import { SearchIcon, CloseIcon } from '@commercetools-uikit/icons';
import {
  createSequentialId,
  filterDataAttributes,
  warning,
} from '@commercetools-uikit/utils';
import { warnIfMenuPortalPropsAreMissing } from '@commercetools-uikit/select-utils';
import {
  getClearIconButtonStyles,
  getSearchIconButtonStyles,
  getSelectableSearchInputContainerStyles,
  getSelectableSearchInputStyles,
} from './selectable-search-input.styles';
import SelectableSelect from './selectable-select';
import { useFieldId, useToggleState } from '@commercetools-uikit/hooks';
import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';
import { css } from '@emotion/react';
import { type Props as ReactSelectProps } from 'react-select';

const Container = styled.div`
  display: flex;
`;

const getTextInputName = (name?: string) =>
  name ? `${name}.textInput` : undefined;

const getDropdownName = (name?: string) =>
  name ? `${name}.dropdown` : undefined;

export type TCustomEvent = {
  target: {
    id?: string;
    name?: string;
    value?: string | string[] | null;
  };
  persist?: () => void;
};

export type TValue = {
  text: string;
  option: string;
};

export type TOption = {
  value: string;
  label?: ReactNode;
};

export type TOptionObject = {
  options: TOption[];
};

export type TOptions = TOption[] | TOptionObject[];

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
  _experimentalValue?: TValue;
  /**
   * Called with the event of the input or dropdown when either the selectable dropdown or the text input have changed.
   * The change event from the text input has a suffix of `.textInput` and the change event from the dropdown has a suffix of `.dropdown`.
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
  onSubmit: (value: TValue) => void;
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
   * Use this property to reduce the paddings of the component for a ui compact variant
   */
  isCondensed?: boolean;
  /**
   * Horizontal size limit of the input fields.
   */
  horizontalConstraint?: 10 | 11 | 12 | 13 | 14 | 15 | 16 | 'scale' | 'auto';
  /**
   * Array of options that populate the select menu
   */
  options: TOptions;
  /**
   * z-index value for the menu portal
   * <br>
   * Use in conjunction with `menuPortalTarget`
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
  /**
   * Show submit button in the input
   */
  showSubmitButton?: boolean;
  /**
   *  used to pass data-* props to the select component.
   * eg: selectDataProps={[{ 'prop-1': 'value-1' }, { 'prop-2': 'value-2' }]}
   */
  selectDataProps?: Record<string, string>;
  /**
   *  used to pass data-* props to the input element.
   * eg: inputDataProps={[{ 'prop-1': 'value-1' }, { 'prop-2': 'value-2' }]}
   */
  inputDataProps?: Record<string, string>;
  /**
   * Map of components to overwrite the default ones, see what components you can override
   * <br/>
   * [Props from React select was used](https://react-select.com/props)
   */
  selectCustomComponents?: ReactSelectProps['components'];

  /**
   * Custom action icon to be displayed on the right side of the input.
   */
  rightActionIcon?: ReactElement;
  /**
   * Props for the right-action icon-button. Required when rightActionIcon is provided.
   * At least a `label` and an `onClick` prop/function need to be provided.
   */
  rightActionProps?: TIconButtonProps;
};

const selectableSearchInputSequentialId = createSequentialId(
  'selectable-search-input-'
);

const isOptionObject = (
  option: TOption | TOptionObject
): option is TOptionObject => (option as TOptionObject).options !== undefined;

const transformDataProps = (dataProps?: Record<string, string>) =>
  Object.fromEntries(
    Object.entries(dataProps || {}).map(([key, value]) => [
      `data-${key}`,
      value,
    ])
  );

const SelectableSearchInput = ({
  horizontalConstraint = 'scale',
  isClearable = true,
  menuHorizontalConstraint = 3,
  showSubmitButton = true,
  menuPortalZIndex = 1,
  onChange,
  ...props
}: TSelectableSearchInputProps) => {
  const [dropdownHasFocus, toggleDropdownHasFocus] = useToggleState(false);
  const [searchValue, setSearchValue] = useState(props.value.text || '');
  const [searchOption, setSearchOption] = useState(props.value.option || '');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textInputRef = useRef<HTMLInputElement>(null);

  const allProps = {
    horizontalConstraint,
    isClearable,
    menuHorizontalConstraint,
    showSubmitButton,
    menuPortalZIndex,
    onChange,
    ...props,
  };
  const legacyDataProps = filterDataAttributes(props);
  const transformedSelectDataProps = transformDataProps(props.selectDataProps);
  const transformedInputDataProps = transformDataProps(props.inputDataProps);
  const searchInputValue = props._experimentalValue?.text ?? searchValue;
  const searchInputOption = props._experimentalValue?.option ?? searchOption;

  const optionsWithoutGroups = props.options.flatMap((option) => {
    if (isOptionObject(option)) {
      return option.options;
    }
    return option;
  });

  const selectedOption = optionsWithoutGroups.find(
    (option) => option.value === searchInputOption
  );

  if (props.rightActionIcon && !props.rightActionProps) {
    warning(
      false,
      'SelectableSearchInput: `rightActionIcon` is provided but `rightActionProps` is missing. Provide an object with a `label` and `onClick` property.'
    );
  }
  const selectablSearchInputId = useFieldId(
    props.id,
    selectableSearchInputSequentialId
  );

  if (!props.isReadOnly) {
    warning(
      typeof onChange === 'function',
      'SelectableSearchInput: `onChange` is required when is not read only.'
    );
  }

  warnIfMenuPortalPropsAreMissing({
    menuPortalZIndex: menuPortalZIndex,
    menuPortalTarget: props.menuPortalTarget,
    componentName: 'SelectableSearchInput',
  });

  const { onFocus, onBlur, name } = props;
  const handleTextInputFocus = useCallback(() => {
    if (onFocus) {
      onFocus({
        target: {
          id: SelectableSearchInput.getTextInputId(selectablSearchInputId),
          name: getTextInputName(name),
        },
      });
    }
  }, [onFocus, selectablSearchInputId, name]);

  const handleTextInputBlur = useCallback(() => {
    if (onBlur) {
      onBlur({
        target: {
          id: SelectableSearchInput.getTextInputId(selectablSearchInputId),
          name: getTextInputName(name),
        },
      });
    }
  }, [onBlur, selectablSearchInputId, name]);

  const handleClear = () => {
    setSearchValue('');
    if (props.onReset) {
      props.onReset();
    }
  };

  const handleTextInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    if (onChange) {
      onChange({
        target: {
          id: SelectableSearchInput.getTextInputId(selectablSearchInputId),
          name: getTextInputName(props.name),
          value: event.target.value,
        },
      });
    }
  };

  const handleSubmit = (
    event:
      | KeyboardEvent<HTMLButtonElement>
      | MouseEvent<HTMLButtonElement>
      | KeyboardEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    if (props.onSubmit) {
      props.onSubmit({
        text: searchInputValue,
        option: selectedOption?.value ?? '',
      });
    }
  };

  const dropdownName = getDropdownName(props.name);
  const dropdownId = SelectableSearchInput.getDropdownId(
    selectablSearchInputId
  );

  const handleDropdownFocus = useCallback(() => {
    if (onFocus) {
      onFocus({
        target: {
          id: dropdownId,
          name: dropdownName,
        },
      });
    }
    toggleDropdownHasFocus(true);
  }, [onFocus, toggleDropdownHasFocus, dropdownName, dropdownId]);

  const handleDropdownBlur = useCallback(() => {
    if (onBlur) {
      onBlur({
        target: {
          id: dropdownId,
          name: dropdownName,
        },
      });
    }
    toggleDropdownHasFocus(false);
  }, [toggleDropdownHasFocus, onBlur, dropdownName, dropdownId]);

  const handleContainerBlur = useCallback(
    (event: FocusEvent) => {
      // ensures that both fields are marked as touched when one of them
      // is blurred
      if (
        typeof onBlur === 'function' &&
        !containerRef.current?.contains(event.relatedTarget)
      ) {
        onBlur({
          target: {
            id: SelectableSearchInput.getDropdownId(selectablSearchInputId),
            name: getDropdownName(name),
          },
        });
        onBlur({
          target: {
            id: SelectableSearchInput.getTextInputId(selectablSearchInputId),
            name: getTextInputName(name),
          },
        });
      }
    },
    [onBlur, selectablSearchInputId, name]
  );

  const handleDropdownChange = useCallback(
    (nextSelectedOptions: { value: string } & Record<string, unknown>) => {
      setSearchOption(nextSelectedOptions.value);
      if (onChange) {
        onChange({
          target: {
            id: SelectableSearchInput.getDropdownId(selectablSearchInputId),
            name: getDropdownName(name),
            value: nextSelectedOptions.value,
          },
        });
      }
      textInputRef.current?.focus();
    },
    [onChange, selectablSearchInputId, name]
  );

  return (
    <Constraints.Horizontal max={horizontalConstraint}>
      <Container
        ref={containerRef}
        onBlur={handleContainerBlur}
        data-testid="selectable-search-input-container"
      >
        <Constraints.Horizontal max={menuHorizontalConstraint}>
          <SelectableSelect
            {...allProps}
            id={SelectableSearchInput.getDropdownId(selectablSearchInputId)}
            name={getDropdownName(props.name)}
            dropdownHasFocus={dropdownHasFocus}
            isCondensed={props.isCondensed ?? false}
            handleDropdownFocus={handleDropdownFocus}
            handleDropdownBlur={handleDropdownBlur}
            handleDropdownChange={
              handleDropdownChange as ReactSelectProps['onChange']
            }
            textInputRef={textInputRef}
            selectedOption={selectedOption}
            dataProps={transformedSelectDataProps}
            selectCustomComponents={props.selectCustomComponents}
          />
        </Constraints.Horizontal>
        <div
          css={[
            getSelectableSearchInputContainerStyles(allProps),
            dropdownHasFocus &&
              !props.isReadOnly &&
              css`
                border-left-color: ${designTokens.borderColorForInputWhenFocused};
                &:hover {
                  border-left-color: ${designTokens.borderColorForInputWhenFocused};
                }
              `,
          ]}
        >
          <input
            ref={textInputRef}
            id={SelectableSearchInput.getTextInputId(selectablSearchInputId)}
            name={getTextInputName(props.name)}
            type="text"
            value={searchInputValue}
            onChange={handleTextInputChange}
            onBlur={handleTextInputBlur}
            onFocus={handleTextInputFocus}
            disabled={props.isDisabled}
            placeholder={props.placeholder}
            readOnly={props.isReadOnly}
            autoFocus={props.isAutofocussed}
            autoComplete={props.autoComplete}
            aria-readonly={props.isReadOnly}
            contentEditable={!props.isReadOnly}
            css={getSelectableSearchInputStyles(allProps)}
            {...transformedInputDataProps}
            {...legacyDataProps}
            /* ARIA */
            aria-invalid={props['aria-invalid']}
            aria-errormessage={props['aria-errormessage']}
            data-testid="selectable-input"
            onKeyDown={(event) => {
              if (!props.isReadOnly && event.key === 'Enter') {
                handleSubmit(event);
              }
            }}
          />
          {isClearable &&
            searchInputValue &&
            !props.isDisabled &&
            !props.isReadOnly && (
              <SecondaryIconButton
                icon={<CloseIcon />}
                size={props.isCondensed ? '10' : '20'}
                label={'clear-button'}
                onClick={handleClear}
                css={getClearIconButtonStyles(allProps)}
              />
            )}
          {showSubmitButton && (
            <SecondaryIconButton
              icon={<SearchIcon />}
              size={props.isCondensed ? '20' : '40'}
              label={'search-button'}
              onClick={handleSubmit}
              css={getSearchIconButtonStyles(allProps)}
              isDisabled={props.isDisabled}
            />
          )}

          {props.rightActionIcon && props.rightActionProps && (
            <div
              css={css`
                order: 4;
                margin-left: ${designTokens.spacing30};
              `}
            >
              <IconButton
                theme="primary"
                isDisabled={props.isDisabled || props.isReadOnly}
                size={props.isCondensed ? '10' : '20'}
                icon={props.rightActionIcon}
                {...props.rightActionProps}
              />
            </div>
          )}
        </div>
      </Container>
    </Constraints.Horizontal>
  );
};

SelectableSearchInput.displayName = 'SelectableSearchInput';
SelectableSearchInput.isEmpty = (
  formValue: TSelectableSearchInputProps['value']
) => !formValue || formValue.text.trim() === '';
SelectableSearchInput.getTextInputId = getTextInputName;
SelectableSearchInput.getDropdownId = getDropdownName;

export default SelectableSearchInput;
