// TODO: @redesign cleanup
import {
  cloneElement,
  forwardRef,
  useRef,
  useCallback,
  useEffect,
  Children,
  ReactElement,
  isValidElement,
  MouseEvent,
  KeyboardEvent,
  ForwardedRef,
} from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import AccessibleButton from '@commercetools-uikit/accessible-button';
import { designTokens, useTheme } from '@commercetools-uikit/design-system';
import Text from '@commercetools-uikit/text';
import { warning } from '@commercetools-uikit/utils';
import { CaretUpIcon, CaretDownIcon } from '@commercetools-uikit/icons';
import { useToggleState } from '@commercetools-uikit/hooks';

const getButtonStyles = (isDisabled: boolean, isNewTheme: boolean) => {
  const baseButtonStyles = css`
    display: flex;
    align-items: center;
    height: ${designTokens.bigButtonHeight};
  `;
  if (isDisabled) {
    return [
      baseButtonStyles,
      css`
        box-shadow: none;
        background-color: ${designTokens.backgroundColorForPrimaryActionDropdownWhenDisabled};
        border: ${isNewTheme && `1px solid ${designTokens.colorNeutral}`};
      `,
    ];
  }
  return [
    baseButtonStyles,
    css`
      background-color: ${designTokens.colorSurface};
      box-shadow: ${designTokens.shadowForPrimaryActionDropdown};
      border: ${isNewTheme && `1px solid ${designTokens.colorNeutral}`};
      &:hover {
        box-shadow: ${designTokens.shadowForPrimaryActionDropdownWhenHovered};
        background-color: ${isNewTheme && designTokens.colorNeutral95};
      }
      &:active {
        box-shadow: ${designTokens.shadowForPrimaryActionDropdownWhenActive};
        background-color: ${designTokens.backgroundColorForPrimaryActionDropdownWhenActive};
      }
    `,
  ];
};

type TDropdownHead = {
  iconLeft: ReactElement;
  onClick?: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => void;
  children: string;
  isDisabled: boolean;
  chevron: ReactElement;
  isNewTheme: boolean;
};

const DropdownHead = (props: TDropdownHead) => (
  <div
    css={css`
      display: flex;
      align-items: center;
    `}
  >
    <AccessibleButton
      label={props.children}
      onClick={props.onClick}
      isDisabled={props.isDisabled}
      css={[
        ...getButtonStyles(props.isDisabled, props.isNewTheme),
        css`
          padding: ${designTokens.paddingForPrimaryActionDropdown};
          border-radius: ${designTokens.borderRadiusForPrimaryActionDropdown};
        `,
      ]}
    >
      <span
        css={css`
          margin-right: ${designTokens.marginRightForPrimaryActionDropdown};
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        {cloneElement(props.iconLeft, {
          size: 'big',
          color: props.isDisabled ? 'neutral60' : 'solid',
        })}
      </span>
      <span
        css={css`
          margin: 0 ${designTokens.spacing10} 0 0;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        <Text.Detail tone={props.isDisabled ? 'secondary' : undefined}>
          {props.children}
        </Text.Detail>
      </span>
    </AccessibleButton>
    {props.chevron}
  </div>
);

DropdownHead.displayName = 'DropdownHead';

type TDropdownChevron = {
  onClick: () => void;
  isDisabled: boolean;
  isNewTheme: boolean;
  isOpen: boolean;
};

const DropdownChevron = forwardRef<HTMLButtonElement, TDropdownChevron>(
  (props, ref) => (
    <AccessibleButton
      ref={ref}
      label="Open Dropdown"
      onClick={props.onClick}
      isDisabled={props.isDisabled}
      css={[
        ...getButtonStyles(props.isDisabled, props.isNewTheme),
        css`
          padding: ${designTokens.paddingForPrimaryActionDropdownIcon};
          border-radius: ${designTokens.borderRadiusForPrimaryActionDropdownIcon};
          border-color: ${designTokens.colorNeutral};
          border-width: ${designTokens.borderForPrimaryActionDropdownIcon};
          border-style: solid;
        `,
      ]}
    >
      {/*
    We need to apply pointer-events: none on the icons, so that
    event.target is always set to the button and never to the icons.

    That way we can use the ref to compare event.target to the
    AccessibleButton's button in the global click handler.
  */}
      <div
        // The margin-top is to center the icon as the caret visually looks too high otherwise
        css={css`
          pointer-events: none;
          margin-top: 3px;
        `}
      >
        {cloneElement(
          props.isOpen && !props.isDisabled ? (
            <CaretUpIcon />
          ) : (
            <CaretDownIcon />
          ),
          {
            color: props.isDisabled || props.isNewTheme ? 'neutral60' : 'solid',
            size: 'small',
          }
        )}
      </div>
    </AccessibleButton>
  )
);

DropdownChevron.displayName = 'DropdownChevron';

const Options = styled.div<{ isNewTheme: boolean }>`
  position: absolute;
  z-index: 5;
  width: 100%;
  top: calc(${designTokens.spacing20} + ${designTokens.bigButtonHeight});
  border: 1px solid ${designTokens.borderColorForPrimaryActionDropdownMenu};
  border-radius: ${designTokens.borderRadiusForPrimaryActionDropdownMenu};
  box-shadow: ${designTokens.shadowForPrimaryActionDropdownMenu};
  margin-top: ${designTokens.marginTopForPrimaryActionDropdown};

  > button {
    padding-left: ${(props) => props.isNewTheme && designTokens.spacing30};
    white-space: normal;
    &:active {
      background-color: ${(props) =>
        props.isNewTheme && designTokens.colorInfo95};
    }
  }
`;

/*
  This component registers a global click event listener to close the dropdown.
  It uses this global listener to close when:
    - an element outside of the dropdown is clicked
    - an element in the dropdown options is clicked

  In order to be still able to open the dropdown we have to avoid auto-closing
  when the dropdown trigger itself is clicked. Otherwise it would open and close
  immediately.
 */
type TPrimaryActionDropdown = {
  /**
   * Any React element.
   */
  children: ReactElement[];
};

const PrimaryActionDropdown = (props: TPrimaryActionDropdown) => {
  const ref = useRef<HTMLButtonElement>();
  const [isOpen, toggle] = useToggleState(false);
  const { isNewTheme } = useTheme();

  const handleGlobalClick = useCallback(
    (event) => {
      const dropdownButton = ref.current;
      if (
        dropdownButton &&
        event.target !== dropdownButton &&
        !dropdownButton.contains(event.target)
      ) {
        toggle(false);
      }
    },
    [ref, toggle]
  );
  useEffect(() => {
    window.addEventListener('click', handleGlobalClick);
    return () => {
      window.removeEventListener('click', handleGlobalClick);
    };
  }, [handleGlobalClick]);

  const childrenAsArray = Children.toArray(props.children);
  const primaryOption = (childrenAsArray.find(
    (option) => isValidElement(option) && !option.props.isDisabled
  ) || childrenAsArray[0]) as ReactElement;

  const { onClick } = primaryOption.props;

  const handleClickOnHead = useCallback(
    (event) => {
      if (isOpen) {
        toggle(true);
      } else {
        onClick(event);
      }
    },
    [isOpen, onClick, toggle]
  );
  const handleClickOnChevron = useCallback(() => {
    toggle();
  }, [toggle]);

  warning(
    childrenAsArray.length > 1,
    '@commercetools-frontend/ui-kit/dropdowns/primary-action-dropdown: must contain at least two options'
  );

  return (
    <div
      css={css`
        position: relative;
        display: inline-flex;
        align-items: column;

        > :first-of-type > button {
          height: ${designTokens.heightForPrimaryActionDropdown};
        }
      `}
    >
      <DropdownHead
        iconLeft={primaryOption.props.iconLeft}
        isDisabled={primaryOption.props.isDisabled}
        isNewTheme={isNewTheme}
        onClick={handleClickOnHead}
        chevron={
          <DropdownChevron
            ref={ref as ForwardedRef<HTMLButtonElement>}
            onClick={handleClickOnChevron}
            isDisabled={primaryOption.props.isDisabled}
            isNewTheme={isNewTheme}
            isOpen={isOpen}
          />
        }
      >
        {primaryOption.props.children}
      </DropdownHead>
      {isOpen && !primaryOption.props.isDisabled && (
        <Options isNewTheme={isNewTheme}>{childrenAsArray}</Options>
      )}
    </div>
  );
};

PrimaryActionDropdown.displayName = 'PrimaryActionDropdown';

export default PrimaryActionDropdown;
