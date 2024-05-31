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
import { designTokens } from '@commercetools-uikit/design-system';
import Text from '@commercetools-uikit/text';
import { warning } from '@commercetools-uikit/utils';
import { CaretUpIcon, CaretDownIcon } from '@commercetools-uikit/icons';
import { useToggleState } from '@commercetools-uikit/hooks';

const getButtonStyles = (isDisabled: boolean) => {
  const baseButtonStyles = css`
    display: flex;
    align-items: center;
    height: ${designTokens.heightForButtonAs30};
  `;
  if (isDisabled) {
    return [
      baseButtonStyles,
      css`
        box-shadow: none;
        background-color: ${designTokens.colorNeutral95};
        border: ${`1px solid ${designTokens.colorNeutral}`};
      `,
    ];
  }
  return [
    baseButtonStyles,
    css`
      background-color: ${designTokens.colorSurface};
      box-shadow: ${designTokens.shadow0};
      border: 1px solid ${designTokens.colorPrimary85};
      &:hover {
        box-shadow: ${designTokens.shadow0};
        background-color: ${designTokens.colorPrimary95};
      }
      &:active {
        box-shadow: ${designTokens.shadow0};
        background-color: ${designTokens.colorPrimary90};
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
};

const DropdownHead = (props: TDropdownHead) => {
  return (
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
          ...getButtonStyles(props.isDisabled),
          css`
            padding: 0 ${designTokens.spacing30};
            border-radius: ${designTokens.borderRadius4} 0 0
              ${designTokens.borderRadius4};
          `,
        ]}
      >
        <span
          css={css`
            margin-right: ${designTokens.spacing20};
            display: flex;
            align-items: center;
            justify-content: center;
          `}
        >
          {cloneElement(props.iconLeft, {
            size: 'big',
            color: props.isDisabled ? 'neutral60' : 'primary',
          })}
        </span>
        <span
          css={css`
            margin: 0 ${designTokens.spacing10} 0 0;
            display: flex;
            align-items: center;
            justify-content: center;

            ${!props.isDisabled &&
            css`
              > div {
                color: ${designTokens.fontColorForButtonAsSecondary} !important;
              }
            `}
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
};

DropdownHead.displayName = 'DropdownHead';

type TDropdownChevron = {
  onClick: () => void;
  isDisabled: boolean;
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
        ...getButtonStyles(props.isDisabled),
        css`
          padding: 0 ${designTokens.spacing20};
          border-radius: 0 ${designTokens.borderRadius4}
            ${designTokens.borderRadius4} 0;
          border-color: ${props.isDisabled
            ? designTokens.colorNeutral
            : designTokens.colorPrimary85};
          border-width: 1px 1px 1px 0px;
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
            color: 'neutral60',
            size: 'small',
          }
        )}
      </div>
    </AccessibleButton>
  )
);

DropdownChevron.displayName = 'DropdownChevron';

const Options = styled.div`
  position: absolute;
  z-index: 5;
  width: 100%;
  top: calc(
    ${designTokens.spacing20} + ${designTokens.heightForButtonAs30}
  );
  border: 1px solid ${designTokens.colorSurface};
  border-radius: ${designTokens.borderRadius4};
  box-shadow: 0 2px 5px 0px rgba(0, 0, 0, 0.15);
  margin-top: ${designTokens.spacing20};

  > button {
    padding-left: ${designTokens.spacing30};
    white-space: normal;
    &:active {
      background-color: ${designTokens.colorPrimary95};
    }
    &:hover {
      background-color: ${designTokens.colorPrimary98};
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
export type TPrimaryActionDropdown = {
  /**
   * Any React element.
   */
  children: ReactElement[];
};

const PrimaryActionDropdown = (props: TPrimaryActionDropdown) => {
  const ref = useRef<HTMLButtonElement>();
  const [isOpen, toggle] = useToggleState(false);

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
          height: ${designTokens.heightForButtonAs40};
        }
      `}
    >
      <DropdownHead
        iconLeft={primaryOption.props.iconLeft}
        isDisabled={primaryOption.props.isDisabled}
        onClick={handleClickOnHead}
        chevron={
          <DropdownChevron
            ref={ref as ForwardedRef<HTMLButtonElement>}
            onClick={handleClickOnChevron}
            isDisabled={primaryOption.props.isDisabled}
            isOpen={isOpen}
          />
        }
      >
        {primaryOption.props.children}
      </DropdownHead>
      {isOpen && !primaryOption.props.isDisabled && (
        <Options>{childrenAsArray}</Options>
      )}
    </div>
  );
};

PrimaryActionDropdown.displayName = 'PrimaryActionDropdown';

export default PrimaryActionDropdown;
