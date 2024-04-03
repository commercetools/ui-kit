import React, { type ReactNode } from 'react';
import { css } from '@emotion/react';
// import styled from '@emotion/styled';
import { useToggleState } from '@commercetools-uikit/hooks';
import { designTokens } from '@commercetools-uikit/design-system';

type TDropdownMenuProps = {
  children: ReactNode;
};

const DropdownMenuContext = React.createContext({
  isOpen: false,
  toggle: () => {},
});

// const Options = styled.div<{ isRecolouringTheme: boolean }>`
//   position: absolute;
//   z-index: 5;
//   // width: 100%;
//   // top: calc(
//   //   ${designTokens.spacing20} + ${designTokens.heightForButtonAsMedium}
//   // );
//   border: 1px solid ${designTokens.colorSurface};
//   border-radius: ${designTokens.borderRadius4};
//   box-shadow: 0 2px 5px 0px rgba(0, 0, 0, 0.15);
//   margin-top: ${designTokens.spacing20};
//   padding: ${designTokens.spacing30};

//   > button {
//     // padding-left: ${designTokens.spacing30};
//     padding-left: 0;
//     padding-right: 0;
//     white-space: normal;
//     &:active {
//       background-color: ${designTokens.backgroundColorForDropdownOptionWhenActive};
//     }
//     ${(props) =>
//       props.isRecolouringTheme &&
//       css`
//         &:hover {
//           background-color: ${designTokens.colorPrimary98};
//         }
//       `}
//   }
// `;

function DropDownTrigger(props: { children: ReactNode }) {
  const { toggle } = React.useContext(DropdownMenuContext);
  return <div onClick={toggle}>{props.children}</div>;
}

function DropDownContentMenu(props: { children: ReactNode }) {
  const { isOpen } = React.useContext(DropdownMenuContext);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      css={css`
        position: absolute;
        z-index: 5;
        // width: 100%;
        // top: calc(
        //   ${designTokens.spacing20} + ${designTokens.heightForButtonAsMedium}
        // );
        border: 1px solid ${designTokens.colorSurface};
        border-radius: ${designTokens.borderRadius4};
        box-shadow: 0 2px 5px 0px rgba(0, 0, 0, 0.15);
        margin-top: ${designTokens.spacing20};
        padding: ${designTokens.spacing30};
      `}
    >
      {props.children}
    </div>
  );
}

function DropdownMenu(props: TDropdownMenuProps) {
  const [isOpen, toggle] = useToggleState(false);

  return (
    <DropdownMenuContext.Provider value={{ isOpen, toggle }}>
      {/* <div>{React.cloneElement(props.triggerElement, { onClick: toggle })}</div>
      {isOpen &&  (
        <Options isRecolouringTheme={isRecolouringTheme}>
          {props.children}
        </Options>
      )} */}
      {props.children}
    </DropdownMenuContext.Provider>
  );
}

DropdownMenu.Trigger = DropDownTrigger;
DropdownMenu.ContentMenu = DropDownContentMenu;

export default DropdownMenu;
