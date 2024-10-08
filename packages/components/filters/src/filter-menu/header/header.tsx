import SelectInput from '@commercetools-uikit/select-input';
import IconButton from '@commercetools-uikit/icon-button';
import Spacings from '@commercetools-uikit/spacings';
import { SortingIcon } from '@commercetools-uikit/icons';
import { designTokens } from '@commercetools-uikit/design-system';
import { css } from '@emotion/react';
import { useState } from 'react';

type TOption = {
  value: string;
  label: string;
};

type THeaderProps = {
  label: string;
  operandOptions?: Array<TOption>;
  renderOperandsInput?: boolean;
  onSelectOperand: (value: string) => void;
  onSort?: () => void;
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
  const [headerSelectOptions, setHeaderSelectOptions] = useState<string>();
  const [isActive, setIsActive] = useState(false);

  return (
    <Spacings.Inline>
      <div css={headerContainerStyles}>
        <div>{props.label}</div>
        {props.operandOptions && (
          <div css={getSelectInputStyles(props)}>
            <SelectInput
              appearance="quiet"
              value={
                headerSelectOptions
                  ? headerSelectOptions
                  : props.operandOptions[0].value
              }
              isCondensed={true}
              isSearchable={false}
              options={props.operandOptions}
              onChange={(event) => {
                setHeaderSelectOptions(event.target.value as string);
                props.onSelectOperand(event.target.value as string);
              }}
            />
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
