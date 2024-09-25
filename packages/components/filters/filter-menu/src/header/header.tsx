import { type ReactNode, useState } from 'react';
import IconButton from '@commercetools-uikit/icon-button';
import { SortingIcon } from '@commercetools-uikit/icons';

export type TFilterMenuHeaderProps = {
  label: ReactNode;
  renderOperatorsInput?: () => ReactNode;
  onFilterOptionsSortClick?: Function;
};
function Header(props: TFilterMenuHeaderProps) {
  const [sortActive, setSortActive] = useState(false);
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        borderBottom: 'solid 1px rebeccapurple',
        padding: '8px',
        marginBottom: '16px',
      }}
    >
      {props.label}
      {props.renderOperatorsInput && (
        <div style={{ margin: '0 8px' }}>{props.renderOperatorsInput()}</div>
      )}

      {props.onFilterOptionsSortClick && (
        <div style={{ marginLeft: 'auto' }}>
          <IconButton
            icon={<SortingIcon />}
            onClick={() => {
              setSortActive(!sortActive);
              props.onFilterOptionsSortClick!();
            }}
            label={`sort selected ${props.label} options to top`}
            isToggleButton
            isToggled={sortActive}
            size="20"
          />
        </div>
      )}
    </header>
  );
}

export default Header;
