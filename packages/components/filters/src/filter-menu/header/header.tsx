import {
  useState,
  type ReactNode,
  type MouseEvent,
  type KeyboardEvent,
} from 'react';
import IconButton from '@commercetools-uikit/icon-button';
import { SortingIcon } from '@commercetools-uikit/icons';
import { designTokens } from '@commercetools-uikit/design-system';
import { css } from '@emotion/react';

type THeaderProps = {
  /**
   * the label of the menu header
   */
  label: ReactNode;
  /**
   * the function to render the operator input
   */
  renderOperatorsInput?: () => ReactNode;
  /**
   * the function to sort the data
   */
  onSortRequest?: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => void;
  /**
   * the width of the menu header
   */
};

const headerContainerStyles = css`
  color: ${designTokens.colorNeutral40};
  font-weight: ${designTokens.fontWeight500};
  font-size: ${designTokens.fontSize20};
  line-height: ${designTokens.lineHeight20};
  display: grid;
  grid-template-columns: 1fr min-content;
  align-items: center;
  padding-bottom: ${designTokens.spacing10};
  border-bottom: 1px solid ${designTokens.colorNeutral90};
  width: 100%;
`;

const selectInputStyles = css`
  flex: 0 0 auto;
  max-width: ${designTokens.constraint3};
  margin-left: ${designTokens.spacing20};
`;

const sortButtonMargin = css`
  margin-right: ${designTokens.spacing40};
`;

const operatorInputContainer = css`
  word-break: break-word;
  display: flex;
  align-items: center;
`;

const Header = (props: THeaderProps) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <header css={headerContainerStyles}>
      <div
        css={[operatorInputContainer, props.onSortRequest && sortButtonMargin]}
      >
        <div>{props.label}</div>
        {props.renderOperatorsInput && (
          <div css={selectInputStyles}>{props.renderOperatorsInput()}</div>
        )}
      </div>
      {props.onSortRequest && (
        <IconButton
          size="20"
          theme={isActive ? 'info' : 'default'}
          label="Sort"
          icon={<SortingIcon />}
          isToggleButton={true}
          onClick={(e) => {
            setIsActive(!isActive);
            return props.onSortRequest && props.onSortRequest(e);
          }}
        />
      )}
    </header>
  );
};

export default Header;
