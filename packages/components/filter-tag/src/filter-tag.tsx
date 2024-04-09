import React, { cloneElement, ReactElement, type ReactNode } from "react";
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { designTokens } from "@commercetools-uikit/design-system";
import DropdownMenu, { useDropdownMenuContext } from '@commercetools-uikit/dropdown-menu';
import Spacings from '@commercetools-uikit/spacings';
import Text from "@commercetools-uikit/text";
import { CaretDownIcon, CloseIcon } from '@commercetools-uikit/icons';

const Tag = styled.div`
  background-color: ${designTokens.colorPrimary95};
  border: 1px solid ${designTokens.colorPrimary25};
  border-radius: ${designTokens.borderRadius20};
  display: inline-flex;
  padding: ${designTokens.spacing10} ${designTokens.spacing25};
  color: ${designTokens.colorPrimary25};
  cursor: pointer;
  &:hover {
    background-color: ${designTokens.colorPrimary90};
  }
`;

const Label = (props: { children: ReactNode }) => (
  <Text.Detail tone="primary">
    {props.children}
  </Text.Detail>
);

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

// const Tag = (props: Pick<TFilterTagProps, 'iconLeft' | 'label'>) => {
//   const { toggle } = useDropdownMenuContext();
//   return (
//     <DropdownMenu.Trigger onClick={() => true}>
//       <div css={tagStyles}>
//         <Spacings.Inline scale="s" alignItems="center">
//           <Spacings.Inline scale="xs" alignItems="center">
//             {props.iconLeft &&
//               cloneElement(props.iconLeft, {
//                 size: 'medium',
//                 color: 'primary'
//               })
//             }
//             {
//               typeof props.label === 'string' ?
//                 <Label>
//                   {props.label}
//                 </Label> :
//                 props.label
//             }
//             <CloseIcon size="medium" color="neutral60" />
//           </Spacings.Inline>
//           <span onClick={toggle}>
//             <CaretDownIcon size="medium" color="neutral60" />
//           </span>
//         </Spacings.Inline>
//       </div>
//     </DropdownMenu.Trigger>
//   );
// };

export type TFilterTagProps = {
  label: ReactNode;
  iconLeft?: ReactElement;
  onRemove?: () => void;
  children: ReactNode;
}

function FilterTag(props: TFilterTagProps) {
  return (
    <DropdownMenu>
      {/* <Tag iconLeft={props.iconLeft} label={props.label} /> */}
      <DropdownMenu.Trigger>
        <Tag>
          <Spacings.Inline scale="s" alignItems="center">
            <Spacings.Inline scale="xs" alignItems="center">
              {props.iconLeft &&
                cloneElement(props.iconLeft, {
                  size: 'medium',
                  color: 'primary'
                })
              }
              {
                typeof props.label === 'string' ?
                  <Label>
                    {props.label}
                  </Label> :
                  props.label
              }
              {
                Boolean(props.onRemove) && (
                  <IconWrapper onClick={(event) => {
                    event.stopPropagation();
                    props.onRemove?.();
                  }}>
                    <CloseIcon size="medium" color="neutral60" />
                  </IconWrapper>
                )
              }
            </Spacings.Inline>
            <CaretDownIcon size="medium" color="neutral60" />
          </Spacings.Inline>
        </Tag>
      </DropdownMenu.Trigger>

      <DropdownMenu.ContentMenu>
        {props.children}
      </DropdownMenu.ContentMenu>
    </DropdownMenu>
  )
}

FilterTag.Label = Label;

export default FilterTag;
