import { type ReactElement, useState } from 'react';
import IconButton from '../../../../buttons/icon-button';
import { SortingIcon } from '../../../../icons';

export type TFilterMenuHeaderProps = {
  label: string;
  operatorsInput?: ReactElement;
  onFilterOptionsSortClick?: () => void;
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
      {props.operatorsInput && (
        <div style={{ margin: '0 8px' }}>{props.operatorsInput}</div>
      )}
      {props.onFilterOptionsSortClick && (
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
      )}
    </header>
  );
}

export default Header;
