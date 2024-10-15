import { useState, ReactNode } from 'react';
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
  onSortRequest?: Function;
  /**
   * the width of the menu header
   */
};

const headerContainerStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: ${designTokens.spacing10};
  border-bottom: 1px solid ${designTokens.colorNeutral90};
  width: 100%;
`;

const selectInputStyles = css`
  margin: auto ${designTokens.spacing30} auto ${designTokens.spacing20};
`;

const operatorInputContainer = css`
  display: flex;
  align-items: center;
`;

const Header = (props: THeaderProps) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div css={headerContainerStyles}>
      <div css={operatorInputContainer}>
        <div>{props.label}</div>
        {props.renderOperatorsInput && (
          <div css={selectInputStyles}>{props.renderOperatorsInput()}</div>
        )}
      </div>
      <div>
        {props.onSortRequest && (
          <IconButton
            size="20"
            theme={isActive ? 'info' : 'default'}
            label="Sort"
            icon={<SortingIcon />}
            isToggleButton={true}
            onClick={() => {
              setIsActive(!isActive);
              return props.onSortRequest && props.onSortRequest();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
