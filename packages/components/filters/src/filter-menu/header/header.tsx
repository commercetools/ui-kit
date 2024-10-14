import { useState, ReactNode } from 'react';
import IconButton from '@commercetools-uikit/icon-button';
import Spacings from '@commercetools-uikit/spacings';
import { SortingIcon } from '@commercetools-uikit/icons';
import { designTokens } from '@commercetools-uikit/design-system';
import { css } from '@emotion/react';

type TOption = {
  value: string;
  label: string;
};

type THeaderProps = {
  headerLabel: ReactNode;
  operandOptions?: Array<TOption>;
  renderOperandsInput?: boolean;
  /**
   * the function to render the operator input
   */
  renderOperatorsInput?: () => ReactNode;
  /**
   * the function to sort the data
   */
  onSort?: () => void;
  /**
   * the width of the menu header
   */
  menuHeaderWidth?: string;
};

const headerContainerStyles = css`
  display: flex;
  align-items: center;
  padding-bottom: ${designTokens.spacing10};
  border-bottom: 1px solid ${designTokens.colorNeutral90};
`;

const getSelectInputStyles = (props: THeaderProps) => css`
  width: ${props.menuHeaderWidth};
  margin: ${designTokens.spacing20};
`;

const Header = (props: THeaderProps) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <Spacings.Inline>
      <div css={headerContainerStyles}>
        <div>{props.headerLabel}</div>
        {props.renderOperatorsInput && (
          <div css={getSelectInputStyles(props)}>
            {props.renderOperatorsInput()}
          </div>
        )}
        {props.onSort && (
          <IconButton
            size="20"
            theme={isActive ? 'info' : 'default'}
            label="Sort"
            icon={<SortingIcon />}
            isToggleButton={true}
            onClick={() => {
              setIsActive(!isActive);
              return props.onSort && props.onSort();
            }}
          />
        )}
      </div>
    </Spacings.Inline>
  );
};

export default Header;
